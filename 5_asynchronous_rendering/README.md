<div style="display: flex; justify-content: flex-end; align-items: center; gap: 4px; width: 100%; font-size: 20px; font-weight: 700; color: white;">
<a style="color: white;" href="#en">Eng</a>
<span style="font-size: 18px; font-weight: 500;">|</span>
<a style="color: white;" href="#ru">Rus</a>
</div>

<div id="en"></div>

# **Asynchronous rendering**

> Time limit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1 second  
> Memory limit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;64.0 Мб  
> Input&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;input.json  
> output&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;output.json
  
You are writing an engine for asynchronous rendering. You need to write a function for asynchronous rendering with priority.

## **Input format**
The input is an array of objects describing the data to be rendered. The object has a structure:

```ts
interface RenderItem {
    id: string; // element id
    priority: number; // rendering priority - render elements with the highest priority first
    render: () => Promise<RenderItem[]>; // asynchronous function that renders the current element and returns a list of nested elements to render or null
}
```
## **Outpur format**
You are required to write an asynchronous function that takes as input a list of elements to render and the maximum number of elements to render simultaneously, and returns a list of IDs of all elements in the order they were rendered:

```ts
function renderAsync(renderItems: RenderItem[], n: Number): Promise<string[]>;
```
- It is necessary to render elements in as many groups as possible, but not larger than n elements. While the elements of the group are not rendered, other elements are not taken into processing, but wait for their turn.
- Elements with the same priority should be rendered in the order of their enumeration or appearance.

## **Notes**
Исходный код нужно оформить следующим образом:
``` js
module.exports = function (renderItems, n) {  
    // your solution
}
```

<div id="ru" style="margin-top: 100px"></div>

# **Асинхронный рендеринг**

> Ограничение времени&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1 секунда  
> Ограничение памяти&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;64.0 Мб  
> Ввод&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;input.json  
> Вывод&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;output.json
  
Вы пишете движок для асинхронного рендеринга. Необходимо написать функцию для асинхронного рендеринга с приоритетом.

## **Формат ввода**
На вход подается массив объектов, описывающих данные для рендеринга. Объект имеет структуру:

```ts
interface RenderItem {
    id: string; // идентификатор элемента
    priority: number; // приоритет рендеринга - сначала рендерим элементы с наибольшим приоритетом
    render: () => Promise<RenderItem[]>; // асинхронная функция, которая выполняет рендеринг текущего элемента и возвращает список вложенных элементов для рендеринга либо null
}
```
## **Формат вывода**
От вас требуется написать асинхронную функцию, которая принимает на вход список элементов для рендеринга и максимальное количество элементов для одновременного рендеринга, а возвращает список идентификаторов всех элементов в порядке их рендеринга:

```ts
function renderAsync(renderItems: RenderItem[], n: Number): Promise<string[]>;
```
- Необходимо рендерить элементы максимально возможными по количеству группами, но не большими, чем n элементов. Пока элементы группы не отрендерены, другие элементы не берутся в обработку, а ожидают своей очереди.
- Элементы с одинаковым приоритетом нужно рендерить в порядке их перечисления или появления.

## **Примечания**
Исходный код нужно оформить следующим образом:
``` js
module.exports = function (renderItems, n) {  
    // ваше решение
}
```