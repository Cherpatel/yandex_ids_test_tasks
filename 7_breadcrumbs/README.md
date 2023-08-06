<div style="display: flex; justify-content: flex-end; align-items: center; gap: 4px; width: 100%; font-size: 20px; font-weight: 700; color: white;">
<a style="color: white;" href="#en">Eng</a>
<span style="font-size: 18px; font-weight: 500;">|</span>
<a style="color: white;" href="#ru">Rus</a>
</div>

<div id="en"></div>

# **Breadcrumbs**
The developers decided to write a very comprehensive documentation. And a really large documentation requires good navigation, and breadcrumbs are just the thing. In order not to be constrained by h1-h6 tags, it was decided to use div with data-header attribute, which can take any value corresponding to natural numbers (the number in the data-header attribute denotes the nesting of the header). To avoid listening to every scroll event, an IntersectionObserver is used. You need to write a function that will return a colback for this observer.

Breadcrumbs reflect the position in the document, from the root, to the current header (running through all intermediate levels of headers)

**Current header:**

- A visible header that has no subheaders visible or none. In other words, the highest-level header among those visible in the viewport.
- If there are several such titles, the current one is the first in order
- If there are no headers at all in the viewport, the current one is the closest invisible one from the top. After all, we are just in the "chapter" to which the title is given.

## **Explanation**
- The headers are of the form `<div data-header="2" id="install">installation</div>`.  
- Each header has a unique id  
- Breadcrumbs look like a list of links to headers, the links are separated by slashes  
- Breadcrumbs are displayed in the header element, but you don't need to update them manually, the updateBreadcrumbs update function is given and should be used.  
- updateBreadcrumbs takes an array of ids, the breadcrumbs will be rendered in the appropriate order.  
- There is no way to change the DOM except to call updateBreadcrumbs  
- The solution should be a file that exports a single **synchronous**! function getObserverCallback, which takes updateBreadcrumbs as an argument
``` js
// solution.js

// You can write code at module level, but only getObserverCallback will be imported

export function getObserverCallback(updateBreadcrumbs) {
    // your solution
}
```
The function will be called roughly like this (see main.js file in the zip archive below at the link "download problem condition")
``` js
// main.js

function updateBreadcrumbs(idList) {
    // some kind of turning string[] into a list of links and updating the header
}

document.addEventListener('DOMContentLoaded', () => {
    // your function is called
    const callback = getObserverCallback(updateBreadcrumbs);

    // creates an observer
    const intersectionObserver = new IntersectionObserver(callback);

    // it's following the "headlines"
    document.querySelectorAll('div[data-header]').forEach(el => intersectionObserver.observe(el));
});
```

## **Constraints:**

> Maximum number of headers &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;10^6  
> Maximum number of nesting levels &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;10^4  
> Maximum number of headers visible at the same time 100
> The getObserverCallback function should take no more than a second to execute
> callback should take no more than 10 milliseconds, starting from the second trigger (excluding the initial event with all headers).

<div id="ru" style="margin-top: 100px"></div>

# **Хлебные крошки**
Разработчики решили написать очень полную документацию. А по-настоящему большая документация требует хорошей навигации, и хлебные крошки — то, что надо. Чтобы не сковывать себя рамками h1-h6 тегов, было решено использовать div с атрибутом data-header, который может принимать любые значения, соответствующие натуральным числам (число в атрибуте data-header обозначает вложенность заголовка). Чтобы не слушать каждое событие скролла, используется IntersectionObserver. Необходимо написать функцию, которая возвратит колбек для этого observer.

Хлебные крошки отражают позицию в документе, от корня, до текущего заголовка (пробегая по всем промежуточным уровням заголовков)

**Текущий заголовок:**

- Видимый заголовок, у которого не видны подзаголовки или их не существует. Иначе говоря, заголовок самого высокого уровня из тех, что видны во вьюпорте.
- Если таких несколько, то из них текущий — первый по порядку
- Если во вьюпорте вообще нет заголовков, то текущий — максимально близкий невидимый сверху. Ведь мы находимся как раз в той "главе", которой и дан заголовок.

## **Условия**
- Заголовки имеют вид `<div data-header="2" id="install">installation</div>`  
- У каждого заголовка есть уникальный id  
- Хлебные крошки выглядят как список ссылок на заголовки, ссылки разделены косой чертой  
- Хлебные крошки выводятся в элементе header, но вручную их обновлять не нужно, дана функция обновления updateBreadcrumbs, её и нужно использовать  
- updateBreadcrumbs принимает массив id, хлебные крошки будут отрисованы в соответствующем порядке  
- Менять DOM нельзя, кроме как вызывать updateBreadcrumbs  
- Решение должно представлять из себя файл, в котором экспортируется единственная **синхронная**! функция getObserverCallback, которая в качестве аргумента принимает updateBreadcrumbs  
``` js
// solution.js

// на уровне модуля можно писать код, но импортироваться будет только getObserverCallback

export function getObserverCallback(updateBreadcrumbs) {
    // решение
}
```
Функция будет вызвана примерно так (см. main.js файл в zip архиве ниже по ссылке "скачать условие задачи")
``` js
// main.js

function updateBreadcrumbs(idList) {
    // некое превращение string[] в список ссылок и обновление header
}

document.addEventListener('DOMContentLoaded', () => {
    // ваша функция вызывается
    const callback = getObserverCallback(updateBreadcrumbs);

    // создаётся обсервер
    const intersectionObserver = new IntersectionObserver(callback);

    // он следит за "заголовками"
    document.querySelectorAll('div[data-header]').forEach(el => intersectionObserver.observe(el));
});
```

## **Ограничения:**

> Максимальное количество заголовков &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;10^6  
> Максимальное количество уровней вложенности &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;10^4  
> Максимальное количество видимых одновременно заголовков 100  
> Функция getObserverCallback должна выполнится не более чем за секунду  
> callback должен отрабатывать не более чем за 10 миллисекунд, начиная со второго срабатывания (исключая первоначальное событие со всем заголовками)  