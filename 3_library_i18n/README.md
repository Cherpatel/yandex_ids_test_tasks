<div style="display: flex; justify-content: flex-end; align-items: center; gap: 4px; width: 100%; font-size: 20px; font-weight: 700; color: white;">
<a style="color: white;" href="#en">Eng</a>
<span style="font-size: 18px; font-weight: 500;">|</span>
<a style="color: white;" href="#ru">Rus</a>
</div>

<div id="en"></div>

# **Library i18n**
>Time limit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1 second  
>Memory limit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;64Mb  
>Input&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;input.js  
>Output&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;output.txt  
  
In order to deal with the growing application bandle, you have been tasked with rewriting the internationalization logic in a legacy project. To remove the old internationalization library, you need to write a getI18nText function that repeats the logic of the old library, but using the Intl API.


## **The old framework had the following logic.**

### **Function parameters**
  
- @param stringTokens - description of the string to be internationalized.  
- @param variables - value of variables  
- @param translations - object with translations  
- @param locale - locale

``` js
getI18nText({stringTokens, variables, translations, locale})
```

### **stringTokens**
The text to be internationalized is described in a JSON-like config, which may encounter the following entities:
- #price - translation key, in this case "price"
- $tripDays - variable, in this case "tripDays"
- @date - function, in this case "date". Functions are described as an array with the function name in the first place, and all other values in the array are function parameters.

**Sample:**
``` js
const stringTokens = [  
    "#price",                          // price translation key
    " ",                               // immutable text
    ["@plural", "#day", "$tripDays"],  // pluralization function, to which the translation key and a variable as a numeric value are passed  
    " - ",                             // immutable text
    ["@number", "$tripPrice", "USD"]   // internationalization function, which is passed a number as a variable and a currency  
];
```
### **variables**
Variables are passed as an object.  
**Sample:**
``` js
const variables = {  
  tripDays: 10,  
  tripPrice: 56789.01,  
}
```
### **translations**
Translations are passed as JSON with the following structure:
``` js
const translations = {  
  "ru-RU" : {             // locale
    price: "Цена",        // normal translation
    day: {                // including plural forms
        zero: " дней",  
        one: " день",  
        few: " дня",  
        many: " дней",  
        other: " дней",  
    }  
  },  
  "en-US": {  
      price: "Price",  
      day: {  
          one: " day",  
          other: " days",  
          //...  
        }  
  },  
  //...  
}
```

## **List of functions to be supported**
### **@date**
Date internationalization function. Can accept either a number(timestamp) or a string.  
Signature: "@date(value)".  
Example of function description in the config:

``` js
getI18nText({  
  stringTokens: [["@date", 1676561884561]],  
  locale: "ru-RU",  
}) // четверг, 16 февраля 2023 г., 15:38:04 UTC
```

### **@number**
Function for internationalizing numbers and currency.  
Signature: "@number(value, [currency])".

- If there is no "currency, it returns a formatted number.
- If there is "currency it returns a formatted number with currency.
``` js
getI18nText({  
  stringTokens: [["@number", 56789.01, "USD"]],  
  locale: "ru-RU",  
}) // 56 789,01 $
```
### **@plural**
Pluralization function.  
Signature: "@plural(key, number)"  
Returns a string with a number and key formatted according to the internationalization rules
``` js
getI18nText({  
  stringTokens: [["@plural", "#day", "$tripDays"]],  
  variables: { tripDays: 434.5 },  
  translations: {  
    "ru-RU": {  
      day: {  
        zero: " дней",  
        one: " день",  
        few: " дня",  
        many: " дней",  
        other: " дней",  
      },  
    }  
    // ...  
  },  
  locale: "ru-RU",  
}) // "434,5 дня"
```

### **@list**
Function of internationalization of enumerations.  
Signature: "@list(...args)"  
Returns a "conjunction "list.
``` js
getI18nText({  
  stringTokens: [["@list", "Motorcycle", "$item", "#bus"]],  
  variables: { item: "Car" },  
  translations: {  
    "en-US": {  
        bus: "Bus",  
    },  
    // ...  
  },  
  locale: "en-US",  
}) // "Motorcycle, Car, and Bus"
```
### **@relativeTime**
The internalization function of relative time.  
Signature: "@relativeTime(value, unit)"
``` js
getI18nText({  
  stringTokens: [["@relativeTime", -5, "hours"]],  
  locale: "ru-RU",  
}) // 5 часов назад
```

## **Samples**
``` js
const stringTokens = [  
    "#price",  
    " ",  
    ["@plural", "#day", "$tripDays"],  
    " - ",  
    ["@number", "$tripPrice", "USD"]  
];  
 
 
const variables = {  
  tripDays: 10,  
  tripPrice: 56789.01,  
}  
 
const translations = {  
  "ru-RU" : {             // locale  
    price: "Цена",        // the usual translation for the price key  
    day: {                // translation for day key taking into account plural forms  
        zero: " дней",  
        one: " день",  
        few: " дня",  
        many: " дней",  
        other: " дней",  
    }  
  },  
  "en-US": {  
      price: "Price",  
      day: {  
          one: " day",  
          other: " days",  
          //...  
        }  
  },  
  //...  
}  
 
getI18nText({stringTokens, variables, translations, locale: "ru-RU"}) //  "Цена 10 дней - 56 789,01 $"  
getI18nText({stringTokens, variables, translations, locale: "en-US"}) //  "Price 10 days - $56,789.01"
```
Code template
``` js
module.exports = function getI18nText({ stringTokens, variables, translations, locale }) {  
   // your code here  
 
  return i18nText // string
}
```

### **Sample 1**
**Input**
``` js
module.exports = [
    ["key", " ", "$var", " ", "#translation"],
    { var: 100 },
    {
        "ru-RU": { translation: "тест" },
        "en-US": { translation: "test" },
        "de-DE": { translation: "prüfen" },
        "hi-IN": { translation: "परीक्षा" },
        "ar-AA": { translation: "امتحان" },
    },
]
```
**Output**  
key 100 тест  
key 100 test  
key 100 prüfen  
key 100 परीक्षा  
key 100 امتحان  

### **Sample 2**
**Input**
``` js
module.exports = [
    [["@number", "$var", "USD"]],
    { var: 123456789.0123 },
    {},
]
```
**Output**  
123 456 789,01 \$  
\$123,456,789.01  
123.456.789,01 \$  
\$12,34,56,789.01  
١٢٣٬٤٥٦٬٧٨٩٫٠١ US\$  
## **Notes**
The test will use node.js version 18. Answers may differ on older versions:
``` js
// Timestamp date  
module.exports = [  
    [["@date", 1676561884561]],  
    {},  
    {},  
]  
 
// node@19.2.0  
// четверг, 16 февраля 2023 г. в 18:38:04 GMT+3  
 
// node@14.17.5  
// четверг, 16 февраля 2023 г., 18:38:04 GMT+3  
//
```

<div id="ru" style="margin-top: 100px"></div>

# **Библиотека i18n**
>Ограничение времени&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1 секунда  
>Ограничение памяти&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;64Mb  
>Ввод&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;input.js  
>Вывод&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;output.txt  
  
В целях борьбы с разрастающимся бандлом приложения, вам поставили задачу переписать логику интернационализации в легаси проекте. Чтобы удалить старую библиотеку интернационализации вам нужно написать функцию getI18nText, которая будет повторять логику старой библиотеки, но с использованием Intl API.


## **Старый фреймворк имел следующую логику.**

### **Параметры функции**
  
- @param stringTokens - описание строки которую нужно интернационализировать.  
- @param variables - значение переменных  
- @param translations - объект с переводами  
- @param locale - локаль

``` js
getI18nText({stringTokens, variables, translations, locale})
```

### **stringTokens**
Текст, который нужно интернационализировать, описывается в JSON-like конфиге, в котором могут встретиться следующие сущности:
- #price - ключ перевода, в данном случае "price"
- $tripDays - переменная, в данном случае "tripDays"
- @date - функции, в данном случае "date". Функции описываются как массив в котором на первом месте стоит имяфункции, а все остальные значения в массиве это параметры функции.

**Пример:**
``` js
const stringTokens = [  
    "#price",                          // ключ перевода price  
    " ",                               // неизменяемый текст  
    ["@plural", "#day", "$tripDays"],  // функция плюрализации, в которую передаётся ключ перевода и переменная в качестве числового значения  
    " - ",                             // неизменяемый текст  
    ["@number", "$tripPrice", "USD"]   // функция интернационализации, в которую  передаётся число в качестве переменной и валюта  
];
```
### **variables**
Переменные передаются как объект.  
**Пример:**
``` js
const variables = {  
  tripDays: 10,  
  tripPrice: 56789.01,  
}
```
### **translations**
Переводы передаются как JSON cо следующей структурой:
``` js
const translations = {  
  "ru-RU" : {             // локаль  
    price: "Цена",        // обычный перевод  
    day: {                // c учетом плюральных форм  
        zero: " дней",  
        one: " день",  
        few: " дня",  
        many: " дней",  
        other: " дней",  
    }  
  },  
  "en-US": {  
      price: "Price",  
      day: {  
          one: " day",  
          other: " days",  
          //...  
        }  
  },  
  //...  
}
```

## **Cписок функций которые требуется поддержать**
### **@date**
Функция интернационализации даты. Может принимать как число(timestamp), так и строку.  
Сигнатура: "@date(value)"  
Пример описания функции в конфиге:

``` js
getI18nText({  
  stringTokens: [["@date", 1676561884561]],  
  locale: "ru-RU",  
}) // четверг, 16 февраля 2023 г., 15:38:04 UTC
```

### **@number**
Функция интернационализации чисел и валюты.  
Cигнатура: "@number(value, [currency])"

- Если нет "currency то возвращает отформатированное число
- Если есть "currency то возвращает отформатированное число с валютой
``` js
getI18nText({  
  stringTokens: [["@number", 56789.01, "USD"]],  
  locale: "ru-RU",  
}) // 56 789,01 $
```
### **@plural**
Функция плюрализации.  
Сигнатура: "@plural(key, number)"  
Возвращает строку с отформатированным по правилам интернационализации числом и ключом
``` js
getI18nText({  
  stringTokens: [["@plural", "#day", "$tripDays"]],  
  variables: { tripDays: 434.5 },  
  translations: {  
    "ru-RU": {  
      day: {  
        zero: " дней",  
        one: " день",  
        few: " дня",  
        many: " дней",  
        other: " дней",  
      },  
    }  
    // ...  
  },  
  locale: "ru-RU",  
}) // "434,5 дня"
```

### **@list**
Функция интернационализации перечеслений.  
Сигнатура: "@list(...args)"  
Возвращет "conjunction"список.
``` js
getI18nText({  
  stringTokens: [["@list", "Motorcycle", "$item", "#bus"]],  
  variables: { item: "Car" },  
  translations: {  
    "en-US": {  
        bus: "Bus",  
    },  
    // ...  
  },  
  locale: "en-US",  
}) // "Motorcycle, Car, and Bus"
```
### **@relativeTime**
Функция интернационализации относительного времени.  
Сигнатура: "@relativeTime(value, unit)"
``` js
getI18nText({  
  stringTokens: [["@relativeTime", -5, "hours"]],  
  locale: "ru-RU",  
}) // 5 часов назад
```

## **Пример работы**
``` js
const stringTokens = [  
    "#price",  
    " ",  
    ["@plural", "#day", "$tripDays"],  
    " - ",  
    ["@number", "$tripPrice", "USD"]  
];  
 
 
const variables = {  
  tripDays: 10,  
  tripPrice: 56789.01,  
}  
 
const translations = {  
  "ru-RU" : {             // локаль  
    price: "Цена",        // обычный перевод для ключа price  
    day: {                // перевод для ключа day c учетом плюральных форм  
        zero: " дней",  
        one: " день",  
        few: " дня",  
        many: " дней",  
        other: " дней",  
    }  
  },  
  "en-US": {  
      price: "Price",  
      day: {  
          one: " day",  
          other: " days",  
          //...  
        }  
  },  
  //...  
}  
 
getI18nText({stringTokens, variables, translations, locale: "ru-RU"}) //  "Цена 10 дней - 56 789,01 $"  
getI18nText({stringTokens, variables, translations, locale: "en-US"}) //  "Price 10 days - $56,789.01"
```
Шаблон кода
``` js
module.exports = function getI18nText({ stringTokens, variables, translations, locale }) {  
   // ваш код здесь  
 
  return i18nText // строка  
}
```

### **Пример 1**
**Ввод**
``` js
module.exports = [
    ["key", " ", "$var", " ", "#translation"],
    { var: 100 },
    {
        "ru-RU": { translation: "тест" },
        "en-US": { translation: "test" },
        "de-DE": { translation: "prüfen" },
        "hi-IN": { translation: "परीक्षा" },
        "ar-AA": { translation: "امتحان" },
    },
]
```
**Вывод**  
key 100 тест  
key 100 test  
key 100 prüfen  
key 100 परीक्षा  
key 100 امتحان  

### **Пример 2**
**Ввод**
``` js
module.exports = [
    [["@number", "$var", "USD"]],
    { var: 123456789.0123 },
    {},
]
```
**Вывод**  
123 456 789,01 \$  
\$123,456,789.01  
123.456.789,01 \$  
\$12,34,56,789.01  
١٢٣٬٤٥٦٬٧٨٩٫٠١ US\$  
## **Примечания**

Для проверки будет использоваться node.js 18 версии. На более старых версиях ответы могут отличаться:  
``` js
// Timestamp date  
module.exports = [  
    [["@date", 1676561884561]],  
    {},  
    {},  
]  
 
// node@19.2.0  
// четверг, 16 февраля 2023 г. в 18:38:04 GMT+3  
 
// node@14.17.5  
// четверг, 16 февраля 2023 г., 18:38:04 GMT+3  
//
```