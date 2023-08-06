<div style="display: flex; justify-content: flex-end; align-items: center; gap: 4px; width: 100%; font-size: 20px; font-weight: 700; color: white;">
<a style="color: white;" href="#en">Eng</a>
<span style="font-size: 18px; font-weight: 500;">|</span>
<a style="color: white;" href="#ru">Rus</a>
</div>

<div id="en"></div>

# **Online store**
You have an obfuscated API client of an online store and user's shopping cart data. The obfuscation of the client is that you don't know the names of the methods, but you know their semantics. The format of the user's shopping cart data is also known. You need to determine the total cost of the order.

## **Interface:**
``` ts
interface CartItem {
    articleId: number; // product id
    quantity: number;  // order quantity
}

interface Cart {
    userId: number;    // user id
    orderDate: string; // order date in ISO 8601 format without time
    items: CartItem[]; // order items
    cityId: number;    // delivery city id
    currency: string;  // order currency code
}
```

## **API client methods:**

- Get the default currency code. The returned value is a string.
- Get prices for the given date. Input parameters - a string with date in ISO 8601 format without time. Return value - a list of records with price data. Each record contains product id (articleId field), price, price relevance date (in ISO 8601 format without time) and can optionally contain currency code (in string format).
- Get the balance of goods for a given date.
Input parameters - string with date in ISO 8601 format without time. Returned value - list of records with data about the balances. Each record contains item id (articleId field), quantity, residual date (in ISO 8601 format without time) and lot number (in string format). Multiple lots of the same item may be present.
- Get the cost of delivery to the specified city. Input parameters - id of the city. The return value is a number.
- Convert the amount of money from one currency to another. Input parameters - currency to convert from, currency to convert to, amount. The return value is a number.

All methods are synchronous. You should not focus on methods that validate input parameters and throw an error. For example, methods that take date as input will not throw an error if you pass a date in an incorrect format, but will simply return an empty result.

## **Requirements Functionality:**
- If there is no price for an item from the cart on the order date, it is excluded from the order (i.e. it can be considered that the price of the item is 0).
- The order can not include more units of goods than there are total for all batches of this product in the stock.
- The cost of the order is the sum of the cost of all items and the cost of shipping, and all prices must be taken in the currency specified in the order.
- For methods that return lists of objects, the composition of object fields is not given deliberately: only the name of the articleId field is known, it is part of the task to understand which fields contain which values.
***
## **Notes**
apiClient is an instance of a class (think about how to use this knowledge). The source code should be formatted as follows:
``` js
module.exports = function (apiClient, cart) {  
    // your solution
}
```
A JavaScript solution is expected; descriptions of TypeScript object interfaces are provided for convenience.

<div id="ru" style="margin-top: 100px"></div>

# **Интернет-магазин**
У вас есть обфусцированный API-клиент интернет-магазина и данные корзины пользователя. Обфускация клиента заключается в том, что вам неизвестны имена методов, но известна их семантика. Формат данных корзины пользователя также известен. Требуется определить итоговую стоимость заказа.

## **Интерфейс:**
``` ts
interface CartItem {
    articleId: number; // id товара
    quantity: number;  // количество товара в заказе
}

interface Cart {
    userId: number;    // id пользователя
    orderDate: string; // дата заказа в формате ISO 8601 без времени
    items: CartItem[]; // позиции заказа
    cityId: number;    // id города доставки
    currency: string;  // код валюты заказа
}
```

## **Методы API-клиента:**

- Получить код валюты по умолчанию. Возвращаемое значение - строка.
- Получить цены на заданную дату. Входные параметры – строка с датой в формате ISO 8601 без времени. Возвращаемое значение - список записей с данными о ценах. Каждая запись содержит id товара (поле articleId), цену, дату актуальности цены (в формате ISO 8601 без времени) и может опционально содержать код валюты (в формате строки).
- Получить остатки товара на заданную дату.
Входные параметры - строка с датой в формате ISO 8601 без времени. Возвращаемое значение - список записей с данными об остатках. Каждая запись содержит id товара (поле articleId), количество, дату остатка (в формате ISO 8601 без времени) и номер партии (в формате строки). Могут присутствовать несколько партий одного товара.
- Получить стоимость доставки в указанный город. Входные параметры - id города. Возвращаемое значение - число.
- Сконвертировать количество денег из одной валюты в другую. Входные параметры - валюта, из которой конвертируем, валюта, в которую конвертируем, сумма. Возвращаемое значение - число.

Все методы - синхронные. Не стоит ориентироваться на то, что методы валидируют входные параметры и выбрасывают ошибку. Например, методы, принимающие на вход дату, не будут выбрасывать ошибку, если передать дату в неверном формате, а просто вернут пустой результат.

## **Условия:**
- Если для товара из корзины нет цены на дату заказа, он исключается из заказа (то есть можно считать, что цена товара равна 0).
- В заказ не может быть включено единиц товара больше, чем есть суммарно по всем партиям этого товара на остатках.
- Стоимость заказа складывается из стоимости всех позиций и стоимости доставки, причем все цены должны быть взяты в валюте, указанной в заказе.
- Для методов, возвращающих списки объектов, состав полей объектов не приводится сознательно: известно только имя поля articleId, понять в каких полях какие значения содержатся – часть задачи.
***
## **Примечания**
apiClient представляет из себя экземпляр класса (подумайте, как использовать это знание). Исходный код нужно оформить следующим образом:
``` js
module.exports = function (apiClient, cart) {  
    // ваше решение
}
```
Ожидается решение на языке JavaScript, описания интерфейсов объектов на TypeScript приведены для удобства.