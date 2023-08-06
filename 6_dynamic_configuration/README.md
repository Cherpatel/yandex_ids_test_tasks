<div style="display: flex; justify-content: flex-end; align-items: center; gap: 4px; width: 100%; font-size: 20px; font-weight: 700; color: white;">
<a style="color: white;" href="#en">Eng</a>
<span style="font-size: 18px; font-weight: 500;">|</span>
<a style="color: white;" href="#ru">Rus</a>
</div>

<div id="en"></div>

# **Dynamic configuration**
The main computer beeps - your colleagues have sent a reply. When you open the message, you see only a set of incomprehensible symbols. After a little digging into the code, you realize that the configuration library is used in statistical objects:

``` js
const { 
    configValue, // (key: string) => string;
    changeConfig, // (value: string) => void;
} = require('configs');

const options = {
   key1: configValue('key1'),
   key2: configValue('key2'),
   key3: configValue('key3'),
};

console.log(options.key1) // Outputs 'first:key1',

changeConfig('second');

console.log(options.key1) // Still outputs 'first:key1' when it should be 'second:key1'
```
You can see that switching configurations in this case does not change the values as required.

Therefore, to fix the system, we need to make these objects dynamic using the makeDynamicConfig function. And for it to be able to interact with the keys, all calls to the configValue function should be replaced with a call to the dynamicConfigValue function:

``` js
const {
    changeConfig, 
    dynamicConfigValue,
    makeDynamicConfig,
} = require('dynamic-congigs');

const options = makeDynamicConfig({
   key1: dynamicConfigValue('key1'),
   key2: dynamicConfigValue('key2'),
   key3: dynamicConfigValue('key3'),
});

console.log(options.key1) // Outputs 'first:key1',

changeConfig('second');

console.log(options.key1) // Outputs 'second:key1'
```
As a solution, we need to implement the functions makeDynamicConfig and dynamicConfigValue. To do this, you need to send a solution in the following form:
``` js
module.exports = function(configValue /* (key: string) => string */) {
    // your solution
    const makeDynamicConfig = e => e;
    const dynamicConfigValue = configValue;

    return {
        makeDynamicConfig,
        dynamicConfigValue,
    };
}
```
**Complex use case:**
``` js
const object = makeDynamicConfig({
    key: dynamicConfigValue('key'),
    key2: dynamicConfigValue('key2'),
    key3: 10,
    key4: {
        innerKey: 'innerKey',
        innerObj: {
            test: 123,
            key: null,
            someOtherKey: [],
        },
    },
    array: [
        dynamicConfigValue('array1'),
        dynamicConfigValue('array2'),
        dynamicConfigValue('array3'),
        {
            key: dynamicConfigValue('array4')
        }
    ]
});

const object2 = makeDynamicConfig({
    options: object,
    key: dynamicConfigValue('object2key')
});
```
There will be no cases in the testing where the result of dynamicConfigValue() is used as an object key.

The testing example is available in the attached file.

<div id="ru" style="margin-top: 100px"></div>

# **Динамическая конфигурация**
На главном компьютере раздался сигнал — твои коллеги прислали ответ. Открыв сообщение, ты видишь только набор непонятных символов. Немного покопавшись в коде, ты понимаешь, что библиотека конфигураций используется в статистических объектах:

``` js
const { 
    configValue, // (key: string) => string;
    changeConfig, // (value: string) => void;
} = require('configs');

const options = {
   key1: configValue('key1'),
   key2: configValue('key2'),
   key3: configValue('key3'),
};

console.log(options.key1) // Выводит 'first:key1',

changeConfig('second');

console.log(options.key1) // Все еще выводит 'first:key1', а должно 'second:key1'
```
Видно, что переключение конфигураций в данном случае не меняет значения как требуется.

Поэтому, чтобы починить систему, нужно сделать эти объекты динамическими с помощью функции makeDynamicConfig. А чтобы она могла взаимодействовать с ключами, все вызовы функции configValue нужно заменить на вызов функции dynamicConfigValue:

``` js
const {
    changeConfig, 
    dynamicConfigValue,
    makeDynamicConfig,
} = require('dynamic-congigs');

const options = makeDynamicConfig({
   key1: dynamicConfigValue('key1'),
   key2: dynamicConfigValue('key2'),
   key3: dynamicConfigValue('key3'),
});

console.log(options.key1) // Выводит 'first:key1',

changeConfig('second');

console.log(options.key1) // Выводит 'second:key1'
```
В качестве решения нужно как раз реализовать функции makeDynamicConfig и dynamicConfigValue. Для этого требуется прислать решение в следующем виде:
``` js
module.exports = function(configValue /* (key: string) => string */) {
    // Ваше решение
    const makeDynamicConfig = e => e;
    const dynamicConfigValue = configValue;

    return {
        makeDynamicConfig,
        dynamicConfigValue,
    };
}
```
**Сложный пример использования:**
``` js
const object = makeDynamicConfig({
    key: dynamicConfigValue('key'),
    key2: dynamicConfigValue('key2'),
    key3: 10,
    key4: {
        innerKey: 'innerKey',
        innerObj: {
            test: 123,
            key: null,
            someOtherKey: [],
        },
    },
    array: [
        dynamicConfigValue('array1'),
        dynamicConfigValue('array2'),
        dynamicConfigValue('array3'),
        {
            key: dynamicConfigValue('array4')
        }
    ]
});

const object2 = makeDynamicConfig({
    options: object,
    key: dynamicConfigValue('object2key')
});
```
В тестировании не будет случаев, когда результат dynamicConfigValue() используется в виде ключа объекта.

Пример тестирования доступен в приложенном файле.