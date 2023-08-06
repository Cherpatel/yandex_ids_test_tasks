function isISO8601(str) {
    return /^(\d{4})-([0-1][0-9])-([0-3][0-9])$/.test(str);
}

function getCartCost(apiClient, cart) {
    const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(apiClient))
        .filter(field => typeof apiClient[field] === "function" && field !== "constructor");

    const getDefaultСurrency = methods.find(meth => apiClient[meth].length === 0);
    const convertСurrency = methods.find(meth => apiClient[meth].length === 3);

    // price calculation data
    const defaultCurrency = apiClient[getDefaultСurrency]();
    // ---------------

    const undefinedMethods = methods.filter(meth => apiClient[meth].length === 1);
    const getDeliveryCost = undefinedMethods.find(meth => {
        try {
            if (typeof apiClient[meth](cart.cityId) === "number") return true;
            return false;
        } catch {
            return false;
        }
    });

    let [getGoodsPrices, getGoodsRests] = undefinedMethods.filter(meth => meth !== getDeliveryCost);
    {
        const prices = apiClient[getGoodsPrices](cart.orderDate);
        if (!prices.length) return 0;

        const product = prices[0];
        const productKeys = Object.keys(product).filter(key => key !== "articleId");
        const price = productKeys.find(key => typeof product[key] === "number");

        const strKeys = productKeys.filter(key => key !== price);
        if (strKeys.length === 2) {
            let [date, currency] = strKeys;
            if (!isISO8601(product[date]))
                [date, currency] = [currency, date]

            try {
                const convertedPrice = apiClient[convertСurrency](product[currency], defaultCurrency, product[price]);
                if (typeof convertedPrice !== "number" || Number.isNaN(convertedPrice))
                    [getGoodsPrices, getGoodsRests] = [getGoodsRests, getGoodsPrices];
            } catch {
                [getGoodsPrices, getGoodsRests] = [getGoodsRests, getGoodsPrices];
            }
        }
    }

    // API parsing complete
    // keys
    // 1. getDefaultСurrency
    // 2. getGoodsPrices
    // 3. getGoodsRests
    // 4. getDeliveryCost
    // 5. convertСurrency

    let goodsPrices = apiClient[getGoodsPrices](cart.orderDate);
    let goodsRests = apiClient[getGoodsRests](cart.orderDate);

    if (goodsRests.length === 0) return 0;

    const priceKey = Object.keys(goodsPrices[0]).find(key => typeof goodsPrices[0][key] === "number" && key !== "articleId");
    const quantityKey = Object.keys(goodsRests[0]).find(key => typeof goodsRests[0][key] === "number"  && key !== "articleId");

    goodsRests = goodsRests.reduce((rests, item) => {
        const sameIdIndex = rests.findIndex((elem) => elem["articleId"] === item["articleId"]);

        if (sameIdIndex !== -1)
            rests[sameIdIndex][quantityKey] += item[quantityKey];
        else
            rests.push(item);

        return rests;
    }, []);

    const goods = [];
    for (const price of goodsPrices) {
        const rest = goodsRests.find(elem => elem["articleId"] === price["articleId"]);
        if (rest !== undefined) {
            const newProduct = {};
            newProduct.id = price["articleId"];
            newProduct.price = price[priceKey];
            newProduct.quantity = rest[quantityKey];

            const strKeys = Object.keys(price).filter(key => typeof price[key] === "string");
            if (strKeys.length !== 2) {
                newProduct.currency = defaultCurrency;
            } else {
                if (isISO8601(price[strKeys[0]]))
                    newProduct.currency = price[strKeys[1]];
                else
                    newProduct.currency = price[strKeys[0]];
            }

            goods.push(newProduct);
        }
    }

    let total = 0;
    cart.items.forEach((item) => {
        const itemData = goods.find(elem => elem.id === item["articleId"]);
        if (itemData === undefined) return;

        const totalPrice = apiClient[convertСurrency](itemData.currency, cart.currency, itemData.price);
        const totalQuantity = Math.min(itemData.quantity, item.quantity);

        total += totalPrice * totalQuantity;
    });

    if (total === 0) return 0;
    return total + apiClient[getDeliveryCost](cart.cityId);
}

module.exports = getCartCost;