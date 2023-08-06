<div style="display: flex; justify-content: flex-end; align-items: center; gap: 4px; width: 100%; font-size: 20px; font-weight: 700; color: white;">
<a style="color: white;" href="#en">Eng</a>
<span style="font-size: 18px; font-weight: 500;">|</span>
<a style="color: white;" href="#ru">Rus</a>
</div>

<div id="en"></div>

# **Bloko**
How many different ideas designers can come up with. I just received another mockup for the sidebar, but it only has individual blocks of different shapes to fill the grid of our component. It looks like the blocks can be stacked on top of each other like bricks, and they line up in such a way that there is no empty space left in the sidebar.

## **Requirements Functionality:**

* Write a layout function that fills this grid from bottom to top so that no voids are created
* The function takes an array of unique blocks as input
* The grid can be of different widths
* The block has its own unique number
* The block shape is arbitrary, the width is always equal to the grid width.
* Blocks have the ability to flip over to fit into the grid.
* After all the blocks are lined up, there should be no empty spaces in the component.
* Sidebar is always filled completely (no hanging voids on any dataset)
* The function should return a report about the order of block placement and manipulations with their rotations

``` ts
interface Block {
    id: number;
    form: number[][];
}
interface LayoutResult {
    blockId: number;
    position: number;
    isRotated: boolean;
}
function layout(blocks: Block[]): LayoutResult[]  {
    // code
}
```

## **Samples:**

#### **Sample 1**
``` js
const blocks = [{
    "id": 738,
    "form": [
      [1, 0],
      [1, 1]
    ]
  },
  {
    "id": 841,
    "form": [
      [1, 1],
      [0, 1]
    ]
}];

const result = [
  {
    "blockId": 738,
    "position": 1,
    "isRotated": false
  },
  {
    "blockId": 841,
    "position": 2,
    "isRotated": false
  }
];
```
### **Sample 2**
``` js
const blocks = [{
    "id": 443,
    "form": [
      [1, 0, 1],
      [1, 1, 1]
    ]
  },
  {
    "id": 327,
    "form": [
      [0, 1, 0],
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 0],
      [0, 1, 0]
    ]
  },
  {
    "id": 891,
    "form": [
      [0, 0, 1],
      [1, 0, 1],
      [1, 1, 1]
    ]
}];

const result = [
  {
    "blockId": 443,
    "position": 1,
    "isRotated": false
  },
  {
    "blockId": 327,
    "position": 2,
    "isRotated": true
  },
  {
    "blockId": 891,
    "position": 3,
    "isRotated": true
  }
];
```
### **Sample 3**
``` js
const blocks = [{
    "id": 4892,
    "form": [
      [0, 0, 1],
      [1, 0, 1],
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1]
    ]
  },
  {
    "id": 1839,
    "form": [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
      [1, 0, 0]
    ]
  },
  {
    "id": 8183,
    "form": [
      [0, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 0],
      [0, 1, 0]
    ]
}];

const result = [
  {
    "blockId": 4892,
    "position": 1,
    "isRotated": false
  },
  {
    "blockId": 8183,
    "position": 2,
    "isRotated": false
  },
  {
    "blockId": 1839,
    "position": 3,
    "isRotated": false
  }
];
```
### **Sample 4**
``` js
const blocks = [{
    "id": 1,
    "form": [
      [1, 0, 1],
      [1, 1, 1],
      [1, 1, 1]
    ]
  },
  {
    "id": 2,
    "form": [
      [0, 0, 1],
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1]
    ]
  },
  {
    "id": 3,
    "form": [
      [0, 1, 1],
      [1, 1, 1],
      [0, 1, 0]
    ]
}];

const result = [
  {
    "blockId": 1,
    "position": 1,
    "isRotated": false
  },
  {
    "blockId": 3,
    "position": 2,
    "isRotated": false
  },
  {
    "blockId": 2,
    "position": 3,
    "isRotated": true
  }
];
```

## **Notes**
The solution should be a Node.js module that exports the layout function.
``` js
module.exports = function layout(blocks) { /* ... */ }
```

<div id="ru" style="margin-top: 100px"></div>

# **Блоко**
До чего же разные идеи могут появляться у дизайнеров. Только что был получен очередной макет для сайдбара, но в нем есть только отдельные блоки разной формы, которыми необходимо заполнить сетку нашего компонента. Похоже, что блоки, как кирпичики, можно выкладывать друг на друга, и они выстраиваются таким образом, что в сайдбаре не остается пустого места.

## **Условия:**

* Напишите функцию layout, которая будет заполнять эту сетку снизу вверх таким образом, чтобы не образовывались пустоты
* Функция на вход принимает массив уникальных блоков
* Сетка может быть разной ширины
* Блок имеет свой уникальный номер
* Форма блока произвольная, ширина всегда равна ширине сетки
* Блоки имеют возможность перевернуться, чтобы встроиться в сетку
* После того, как все блоки выстроятся, в компоненте не должно остаться пустот
* Сайдбар всегда заполняется полностью (висящих пустот на любом наборе данных не будет)
* Функция должна возвращать отчет о порядке выставления блоков и манипуляций с их поворотами

``` ts
interface Block {
    id: number;
    form: number[][];
}
interface LayoutResult {
    blockId: number;
    position: number;
    isRotated: boolean;
}
function layout(blocks: Block[]): LayoutResult[]  {
    // code
}
```

## **Примеры:**

#### **Пример 1**
``` js
const blocks = [{
    "id": 738,
    "form": [
      [1, 0],
      [1, 1]
    ]
  },
  {
    "id": 841,
    "form": [
      [1, 1],
      [0, 1]
    ]
}];

const result = [
  {
    "blockId": 738,
    "position": 1,
    "isRotated": false
  },
  {
    "blockId": 841,
    "position": 2,
    "isRotated": false
  }
];
```
### **Пример 2**
``` js
const blocks = [{
    "id": 443,
    "form": [
      [1, 0, 1],
      [1, 1, 1]
    ]
  },
  {
    "id": 327,
    "form": [
      [0, 1, 0],
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 0],
      [0, 1, 0]
    ]
  },
  {
    "id": 891,
    "form": [
      [0, 0, 1],
      [1, 0, 1],
      [1, 1, 1]
    ]
}];

const result = [
  {
    "blockId": 443,
    "position": 1,
    "isRotated": false
  },
  {
    "blockId": 327,
    "position": 2,
    "isRotated": true
  },
  {
    "blockId": 891,
    "position": 3,
    "isRotated": true
  }
];
```
### **Пример 3**
``` js
const blocks = [{
    "id": 4892,
    "form": [
      [0, 0, 1],
      [1, 0, 1],
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1]
    ]
  },
  {
    "id": 1839,
    "form": [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
      [1, 0, 0]
    ]
  },
  {
    "id": 8183,
    "form": [
      [0, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 0],
      [0, 1, 0]
    ]
}];

const result = [
  {
    "blockId": 4892,
    "position": 1,
    "isRotated": false
  },
  {
    "blockId": 8183,
    "position": 2,
    "isRotated": false
  },
  {
    "blockId": 1839,
    "position": 3,
    "isRotated": false
  }
];
```
### **Пример 4**
``` js
const blocks = [{
    "id": 1,
    "form": [
      [1, 0, 1],
      [1, 1, 1],
      [1, 1, 1]
    ]
  },
  {
    "id": 2,
    "form": [
      [0, 0, 1],
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1]
    ]
  },
  {
    "id": 3,
    "form": [
      [0, 1, 1],
      [1, 1, 1],
      [0, 1, 0]
    ]
}];

const result = [
  {
    "blockId": 1,
    "position": 1,
    "isRotated": false
  },
  {
    "blockId": 3,
    "position": 2,
    "isRotated": false
  },
  {
    "blockId": 2,
    "position": 3,
    "isRotated": true
  }
];
```

## **Примечания**
Решение должно представлять из себя Node.js модуль, экспортирующий функцию layout.
``` js
module.exports = function layout(blocks) { /* ... */ }
```