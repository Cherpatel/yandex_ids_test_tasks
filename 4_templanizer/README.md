<div style="display: flex; justify-content: flex-end; align-items: center; gap: 4px; width: 100%; font-size: 20px; font-weight: 700; color: white;">
<a style="color: white;" href="#en">Eng</a>
<span style="font-size: 18px; font-weight: 500;">|</span>
<a style="color: white;" href="#ru">Rus</a>
</div>

<div id="en"></div>

# **Templanizer**
There is HTML where each element can have an x-make attribute with the following values:

- copy:n - copy the current element n times and place new elements after the current element;
- remove:n - remove n elements starting from the next one. If there are no n elements after the current one (number_of_elements_after_the_current < n), then all elements that come after the current one are removed;
- removeChildren:n - remove n descendants of the element, starting from the first one;
- switch:n - swap the current element with the element n steps forward from the current one (it is worth paying attention to examples 2 and 3).

## **Requirements Functionality:**

- Operations should be performed in the following order: all copy operations first, then remove, then removeChildren, and switch last.
- All operations at the top level are performed first, then all operations at the second level, and so on.
- The x-make attribute must be removed after an operation from this attribute is performed.

## **Samples:**

### **Sample 1:**
```js
solution(document.querySelector('entry'))
```
**Before:**
```html
<entry>
    <div>
        <div x-make="remove:1">Block 1</div>
        <div x-make="copy:3">Block 2</div>
    </div>
</entry>
```
**After:**
```
<entry>
    <div>
        <div>Block 1</div>
        <div>Block 2</div>
        <div>Block 2</div>
        <div>Block 2</div>
    </div>
</entry>
```
**Explanation:**

"Block 2" was copied 3 times - now the elements of "Block 2" are four.

Next, the element following "Block 1" was deleted.

### **Sample 2:**
```js
solution(document.querySelector('entry'))
```

**Before:**
```html
<entry>
    <div x-make="removeChildren:2">
        <div x-make="copy:100">Block 1</div>
        <div>Block 2</div>
        <div x-make="switch:7">Block 3</div>
        <div>Block 4</div>
        <div>Block 5</div>
    </div>
</entry>
```
**After:**
```html
<entry>
    <div>
        <div>Block 4</div>
        <div>Block 3</div>
        <div>Block 5</div>
    </div>
</entry>
```
**Explanation:**

The number of blocks of "Block 1" has not increased because it was removed by its parent using removeChildren.

"Block 3" has changed from "Block 4" because the seventh element counting from "Block 3" is "Block 4".

### **Sample 3:**
```js
solution(document.querySelector('entry'))
```

**Before:**
```html
<entry>
    <section>
        <div x-make="switch:2">
            <div x-make="remove:5">Block 1</div>
            <span>Block 2</span>
        </div>
        <div x-make="copy:1">
            <div x-make="remove:5">Block 3</div>
            <div x-make="switch:1">Block 4</div>
        </div>
        <p>Block 5</p>
    </section>
</entry>
```
**After:**
```html
<entry>
    <section>
        <div>
            <div>Block 3</div>
        </div>
        <div>
            <div>Block 3</div>
        </div>
        <div>
            <div>Block 1</div>
        </div>
        <p>Block 5</p>
    </section>
</entry>
```
**Explanation:**

Due to the priority of operations, the second element was copied first - the section now has four elements.
Because of the switch operation, the first block inside the section was swapped with the third one
Because of remove:5 in "Block 1", "Block 2" was deleted
Because of remove:5 in "Block 3", "Block 4" was deleted (in two elements inside the section, because they were copied).
### **Sample 4:**
```js
solution(document.querySelector('entry'))
```

**Before:**
```html
<entry>
    <div x-make="switch:2">1</div>
    <div x-make="switch:3">2</div>
    <div x-make="switch:5">3</div>
</entry>
```
**After:**
```html
<entry>
    <div>1</div>
    <div>2</div>
    <div>3</div>
</entry>
```
**Explanation:**

"Block 1" will swap places with "Block 3". Next, the first element in the container with x-make will be "Block 3" - it will swap places with "Block 1". The remaining "Block 2" swaps places with itself, i.e. it stays in place.

## Notes
The solution should be a function named solution that takes a DOM element - the entry point - as input.

The source code should be formatted as follows:
```js
function solution(entryPoint) {  
    // your solution
}
```
The solution will be tested in the latest version of Google's Chrome browser.

<div id="ru" style="margin-top: 100px"></div>

# **Шаблонизатор**
Есть HTML, где у каждого элемента может быть атрибут x-make со следующими значениями:

- copy:n — скопировать текущий элемент n раз и поместить новые элементы после текущего;
- remove:n — удалить n элементов, начиная со следующего. Если после текущего нет n элементов (количество_элементов_после_текущего < n), то удаляются все элементы, которые идут после текущего;
- removeChildren:n — удалить n потомков элемента, начиная с первого;
- switch:n — поменять текущий элемент местами с элементом через n шагов вперёд от текущего (стоит обратить внимание на примеры 2 и 3).

## **Условия:**

- Операции нужно выполнять в следующем порядке: сначала все copy-операции, потом — remove, далее — removeChildren, а switch — в последнюю очередь.
- Сначала выполняются все операции на верхнем уровне, далее — на втором уровне и т.д.
- Атрибут x-make необходимо удалять после осуществления операции из этого атрибута.

## **Примеры:**

### **Пример 1:**
```js
solution(document.querySelector('entry'))
```
**До:**
```html
<entry>
    <div>
        <div x-make="remove:1">Блок 1</div>
        <div x-make="copy:3">Блок 2</div>
    </div>
</entry>
```
**После:**
```
<entry>
    <div>
        <div>Блок 1</div>
        <div>Блок 2</div>
        <div>Блок 2</div>
        <div>Блок 2</div>
    </div>
</entry>
```
**Пояснение:**

"Блок 2" был скопирован 3 раза — теперь элементов "Блок 2" — четыре.

Дальше был удалён элемент, следующий за "Блок 1".

### **Пример 2:**
```js
solution(document.querySelector('entry'))
```

**До:**
```html
<entry>
    <div x-make="removeChildren:2">
        <div x-make="copy:100">Блок 1</div>
        <div>Блок 2</div>
        <div x-make="switch:7">Блок 3</div>
        <div>Блок 4</div>
        <div>Блок 5</div>
    </div>
</entry>
```
**После:**
```html
<entry>
    <div>
        <div>Блок 4</div>
        <div>Блок 3</div>
        <div>Блок 5</div>
    </div>
</entry>
```
**Пояснение:**

Количество блоков "Блок 1" не увеличилось, т.к. он был удалён родителем с помощью removeChildren.

"Блок 3" поменялся с "Блок 4", т.к. седьмой элемент, считая от "Блок 3", — "Блок 4".

### **Пример 3:**
```js
solution(document.querySelector('entry'))
```

**До:**
```html
<entry>
    <section>
        <div x-make="switch:2">
            <div x-make="remove:5">Блок 1</div>
            <span>Блок 2</span>
        </div>
        <div x-make="copy:1">
            <div x-make="remove:5">Блок 3</div>
            <div x-make="switch:1">Блок 4</div>
        </div>
        <p>Блок 5</p>
    </section>
</entry>
```
**После:**
```html
<entry>
    <section>
        <div>
            <div>Блок 3</div>
        </div>
        <div>
            <div>Блок 3</div>
        </div>
        <div>
            <div>Блок 1</div>
        </div>
        <p>Блок 5</p>
    </section>
</entry>
```
**Пояснение:**

Из-за приоритета операций сначала был скопирован второй элемент — в section теперь четыре элемента.
Из-за операции switch первый блок внутри section поменялся местами с третьим
Из-за remove:5 в "Блок 1" был удалён "Блок 2"
Из-за remove:5 в "Блок 3" был удалён "Блок 4" (в двух элементах внутри section, т.к. они были скопированы)
### **Пример 4:**
```js
solution(document.querySelector('entry'))
```

**До:**
```html
<entry>
    <div x-make="switch:2">1</div>
    <div x-make="switch:3">2</div>
    <div x-make="switch:5">3</div>
</entry>
```
**После:**
```html
<entry>
    <div>1</div>
    <div>2</div>
    <div>3</div>
</entry>
```
**Пояснение:**

"Блок 1" меняется местами с "Блок 3". Далее в контейнере первым элементом с x-make будет идти "Блок 3" — он поменяется местами с "Блок 1". Оставшийся "Блок 2" меняется местами сам с собой, то есть остаётся на месте.

## Примечания
Решение должно представлять из себя функцию с названием solution, принимающую на вход DOM-элемент - точку входа.

Исходный код нужно оформить следующим образом:
```js
function solution(entryPoint) {  
    // ваше решение
}
```
Решение будет тестироваться в последней версии браузера Google Chrome.