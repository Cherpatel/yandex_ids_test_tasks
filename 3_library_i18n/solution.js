function getI18nText({ stringTokens, variables, translations, locale }) {
    function toLocale(key) {
        if (translations[locale] === undefined) return "";
        if (translations[locale][key] === undefined) return "";
        return translations[locale][key];
    }

    function toDate(date) {
        return Intl.DateTimeFormat(locale, {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            timeZoneName: "short"
        }).format(new Date(date));
    }

    function toNumber(num, currency = null) {
        if (currency)
            return Intl.NumberFormat(locale, { style: 'currency', currency }).format(num);
        else
            return Intl.NumberFormat(locale).format(num);
    }

    function toPlural(key, number) {
        const type = new Intl.PluralRules(locale).select(number);
        const localeWord = key[type];
        const localeNumber = toNumber(number);

        if (localeWord[0] === " ")
            return localeNumber + localeWord;
        return localeWord + localeNumber;
    }

    function toList(list) {
        list = list.filter(item => item !== "");
        return new Intl.ListFormat(locale, {
            style: "long",
            type: "conjunction"
        }).format(list);
    }

    function toRelativeTime(value, unit) {
        return new Intl.RelativeTimeFormat(locale).format(value, unit);
    }

    const checkValue = (value) => {
        if (typeof value !== "string") return value;
        const char = value[0];
        const val = value.slice(1);
        if (char === "#") {
            if (translations[locale] === undefined) return "";
            if (translations[locale][val] === undefined) return "";
            return translations[locale][val];
        }
        if (char === "$") {
            if (variables[val] === undefined) return "";
            return variables[val];
        }
        return value;
    }

    let resultString = "";
    for (let token of stringTokens) {
        if (typeof token === "string") {
            resultString += token
                .replaceAll(/#\w+/g, (match) => toLocale(match.slice(1)))
                .replaceAll(/\$\w+/g, (match) => {
                    if (variables[match.slice(1)] === undefined) return "";
                    return variables[match.slice(1)]
                });
        } else {
            let [func, ...args] = token;
            args = args.map((value) => checkValue(value));
            if (func === "@date")
                resultString += toDate(...args);
            else if (func === "@number")
                resultString += toNumber(...args);
            else if (func === "@plural")
                resultString += toPlural(...args);
            else if (func === "@list")
                resultString += toList(args);
            else if (func === "@relativeTime")
                resultString += toRelativeTime(...args);
        }
    }

    return resultString;
}

module.exports = getI18nText;

console.log(getI18nText({  
    stringTokens: ["key", " ", "$var", " ", "#translation"],
    variables: { var: 100 },
    translations: {
        "ru-RU": { translation: "тест" },
        "en-US": { translation: "test" },
        "de-DE": { translation: "prüfen" },
        "hi-IN": { translation: "परीक्षा" },
        "ar-AA": { translation: "امتحان" },
    },  
    locale: "ru-RU",  
  })); // "Motorcycle, Car, and Bus"
