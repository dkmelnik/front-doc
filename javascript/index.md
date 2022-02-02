# JavaScript

## Типы днных в js

В JavaScript есть 8 основных типов.

- `number` для любых чисел: целочисленных или чисел с плавающей точкой; целочисленные значения ограничены диапазоном ±(253-1).
- `bigint` для целых чисел произвольной длины.
- `string` для строк. Строка может содержать ноль или больше символов, нет отдельного символьного типа.
- `boolean` для true/false.
- `null` для неизвестных значений – отдельный тип, имеющий одно значение null.
- `undefined` для неприсвоенных значений – отдельный тип, имеющий одно значение undefined.
- `object` для более сложных структур данных.
- `symbol` для уникальных идентификаторов.

Оператор typeof позволяет нам увидеть, какой тип данных сохранён в переменной.

Имеет две формы: `typeof x` или `typeof(x).`
Возвращает строку с именем типа. Например, "string".
Для null возвращается "object" – это ошибка в языке, на самом деле это не объект.
В следующих главах мы сконцентрируемся на примитивных значениях, а когда познакомимся с ними, перейдём к объектам.

## Разница между == и ===

`==` сранивает с приведением типов
0 == false // true

`===` стравнивает строго
0 === false // false

## Как можно объявить переменную в js

`a = 5`; // аналогичен var

`var b = 5`; // глобальная или функциональная область видимости

`let c = 5`; // let, const имеют блочную область видимости (например в if, try и тд)
`const d = 5`; // константа, но может изменяться если присвоенное значение объект или массив

## В чем разница между null и undefined

- `null` для неизвестных значений – отдельный тип, имеющий одно значение null.
При обнуление значения используется присвоение ей null. Если мы хотим показать что в переменной значение пустое, так же должны присвоить ей null.
- `undefined` для неприсвоенных значений – отдельный тип, имеющий одно значение undefined.

## Map, filter, forEach, every/some/find, reduce

Каждый из этих методов итерируется по массиву.

***map***

Метод `map()` создаёт новый массив с результатом вызова указанной функции для каждого элемента массива.

```javascript
const numbers = [1, 4, 9];
const doubles = numbers.map(function(num) {
  return num * 2;
});
// теперь doubles равен [2, 8, 18], а numbers всё ещё равен [1, 4, 9]
```

***filter***

Метод `filter()` создаёт новый массив со всеми элементами, прошедшими проверку, задаваемую в передаваемой функции.

```javascript
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter(word => word.length > 6);

console.log(result);
// expected output: Array ["exuberant", "destruction", "present"]
```

***forEach***

Метод `forEach()` используется для перебора массива.

```javascript
var arr = ["Яблоко", "Апельсин", "Груша"];

arr.forEach(function(item, i, arr) {
  alert( i + ": " + item + " (массив:" + arr + ")" );
});
```

***every/some/find*** /]

Метод `every()` проверяет, удовлетворяют ли все элементы массива условию, заданному в передаваемой функции.

```javascript
function isBigEnough(element, index, array) {
  return element >= 10;
}
[12, 5, 8, 130, 44].every(isBigEnough);   // false
[12, 54, 18, 130, 44].every(isBigEnough); // true
```

Метод `some()` проверяет, удовлетворяет ли какой-либо элемент массива условию, заданному в передаваемой функции.

```javascript
const array = [1, 2, 3, 4, 5];
// checks whether an element is even
const even = (element) => element % 2 === 0;
console.log(array.some(even));
// expected output: true
```

Метод `find()` возвращает значение первого найденного в массиве элемента, которое удовлетворяет условию переданному в callback функции.  В противном случае возвращается undefined.

```javascript
function isPrime(element, index, array) {
  var start = 2;
  while (start <= Math.sqrt(element)) {
    if (element % start++ < 1) {
      return false;
    }
  }
  return element > 1;
}

console.log([4, 6, 8, 12].find(isPrime)); // undefined, не найдено
console.log([4, 5, 8, 12].find(isPrime)); //5
```

***reduce***

Метод `reduce()` применяет функцию reducer к каждому элементу массива (слева-направо), возвращая одно результирующее значение.

```javascript
[0, 1, 2, 3, 4].reduce(function(accumulator, currentValue, index, array) {
  return accumulator + currentValue;
}, 10);
// 10 + 0 = 10;
// 10 + 1 = 11; ....
```

## Разница между стрелочной и обычной функцией

[5 отличий между обычными и стрелочными функциями](https://vc.ru/dev/133379-5-otlichiy-mezhdu-obychnymi-i-strelochnymi-funkciyami)

## Что такое замыкание?

[Что такое замыкания](https://medium.com/@stasonmars/%D0%BF%D0%BE%D0%BD%D0%B8%D0%BC%D0%B0%D0%B5%D0%BC-%D0%B7%D0%B0%D0%BC%D1%8B%D0%BA%D0%B0%D0%BD%D0%B8%D1%8F-%D0%B2-javascript-%D1%80%D0%B0%D0%B7-%D0%B8-%D0%BD%D0%B0%D0%B2%D1%81%D0%B5%D0%B3%D0%B4%D0%B0-c211805b6898)

Замыкание это функция у которой есть доступ к своей внешней функции по области видимости, даже после того, как внешняя функция прекратилась. Это говорит о том, что замыкание может запоминать и получать доступ к переменным, и аргументам своей внешней функции, даже после того, как та прекратит выполнение.

```javascript
function getCounter() {
  let counter = 0;
  return function() {
    return counter++;
  }
}
let count = getCounter();
console.log(count());  // 0
console.log(count());  // 1
console.log(count());  // 2
```

И снова, мы храним анонимную внутреннюю функцию, возвращенную функцией getCounter в переменной count. Так как функция сount теперь замыкание, она может получать доступ к переменной counter в функции getCounter, даже после того, как та завершится.
Но обратите внимание, что значение counter не сбрасывается до 0 при каждом вызове count, как вроде бы она должна делать.
Так происходит, потому что при каждом вызове count(), создаётся новая область видимости, но есть только одна область видимости, созданная для getCounter, так как переменная counter объявлена в области видимости getCounter(), она увеличится при каждом вызове функции count, вместо того, чтобы сброситься до 0.

## Шаблонные литералы 

- Можно вставлять js выражения
```javascript
const message = `You can ${age < 21 ? 'not' : ''} view this page`
```
- разрешен перенос строки 
```javascript
`
    <img>
        С новой 
        строки
    </img>
`
```

## Что такое set/map?

***Set***

В отличие от массивов, объекты типа Set (мы будем называть их «коллекциями») представляют собой коллекции, содержащие данные в формате ключ/значение.
Значение элемента в Set может присутствовать только в одном экземпляре, что обеспечивает его уникальность в коллекции Set.

Его основные методы это:

- `new Set(iterable)` – создаёт Set, и если в качестве аргумента был предоставлен итерируемый объект (обычно это массив), то копирует его значения в новый Set.
- `set.add(value)` – добавляет значение (если оно уже есть, то ничего не делает), возвращает тот же объект set.
- `set.delete(value)` – удаляет значение, возвращает true, если value было в множестве на момент вызова, иначе false.
- `set.has(value)` – возвращает true, если значение присутствует в множестве, иначе false.
- `set.clear()` – удаляет все имеющиеся значения.
- `set.size` – возвращает количество элементов в множестве.


***Map***

`Map` – это коллекция ключ/значение, как и Object. Но основное отличие в том, что Map позволяет использовать ключи любого типа.

Методы и свойства:

- `new Map()` – создаёт коллекцию.
- `map.set(key, value)` – записывает по ключу key значение value.
- `map.get(key)` – возвращает значение по ключу или undefined, если ключ key отсутствует.
- `map.has(key)` – возвращает true, если ключ key присутствует в коллекции, иначе false.
- `map.delete(key)` – удаляет элемент по ключу key.
- `map.clear()` – очищает коллекцию от всех элементов.
- `map.size` – возвращает текущее количество элементов.

## Объекты
Объекты – ссылочный тип данных. То есть переменные и константы хранят не сами объекты (их данные), а ссылку на них.

### spread оператор
Поверхностное копирование (clone) и слияние (merge) 
можно объединить в одну операцию. 
Это позволяет "обновлять" объекты в функциональном стиле, 
другими словами мы создаем новые 
объекты на основе старых, вместо их обновления.
```javascript
// Поверхностное копирование
const user = { name: 'Vasya', married: true, age: 25 };
const user2 = { name: 'Irina', surname: 'Petrova' };

const mergedObject = { ...user, ...user2 };
// Object.assign({}, user, user2);
```

### rest оператор
С его помощью во время деструктуризации можно собрать все "оставшиеся" свойства в один объект
```javascript
const user = { name: 'Tirion', email: 'support@hexlet.io', age: 44 };
const { name, ...rest } = user;
console.log(rest);
// => { email: 'support@hexlet.io', age: 44 }
```

### Деструктуризация
```javascript
const person = { firstName: 'Rasmus', lastName: 'Lerdorf', manager: true };
const { firstName, manager } = person;
console.log(firstName); // => 'Rasmus'
console.log(manager); // => true

//При деструктуризации можно переименовывать имена. 
// Такое бывает нужно, если подобная 
// константа уже определена выше.
const person = { firstName: 'Rasmus', lastName: 'Lerdorf', manager: true };
const { manager: isManager } = person;
console.log(isManager); // => true
// В случае отсутствия свойств в объекте, 
// деструктуризация позволяет задавать 
// значения по умолчанию для таких свойств:
const person = { firstName: 'Rasmus', lastName: 'Lerdorf' };
console.log(person.manager); // undefined
const { manager = false } = person;
console.log(manager); // => false
//Деструктуризация может быть вложенной.
const { links, attributes: user, relationships: { author } } = response.data;
```

### Ключи и значения 

```javascript
// получаем массив ключей
const course = { name: 'JS: React', slug: 'js-react' };
const keys = Object.keys(course); // [ 'name', 'slug' ]
// получаем массив значений
const course = { name: 'JS: React', slug: 'js-react' };
const values = Object.values(course); // [ 'JS: React', 'js-react' ]
// Ну, и последний вариант, метод, который возвращает сразу ключи и значения объекта
const course = { name: 'JS: React', slug: 'js-react' };
const entries = Object.entries(course); // [[ 'name', 'JS: React' ], [ 'slug', 'js-react' ]]  
```

### Деструктуризация и обход
```javascript
for (const [key, value] of entries) {
  console.log(key);
  console.log(value);
}
```

## Массивы 
Массив внутри – это тоже объект: 
```javascript
typeof []; // 'object'
```
Проектируя функции, работающие с массивами, 
есть два пути: менять исходный массив 
или формировать внутри 
новый и возвращать его наружу. 
Какой лучше? В подавляющем большинстве 
стоит предпочитать второй. 

**Агрегацией** называются любые вычисления,
которые, как правило, строятся на основ
е всего набора данных, например, поиск 
максимального, среднего, суммы и так далее. 

### rest оператор
Rest-оператор позволяет "свернуть" 
часть элементов во время деструктуризации. 
Например с его помощью можно разложить
массив на первый, второй элементы и все остальные:
```javascript
const [first, second, ...rest] = 'some string';
console.log(first); // => 's'
console.log(second); // => 'o'
console.log(rest); // => [ 'm', 'e', ' ', 's', 't', 'r', 'i', 'n', 'g' ]
```

### spread оператор

С его помощью обычно копируют или сливают массивы.
Spread-оператор нередко используется 
для копирования массива. Копирование 
предотвращает изменение исходного массива, 
в том случае, когда необходимо менять его копию
```javascript
const russianCities = ['moscow', 'kazan'];
const copy = [...russianCities];
```

### деструктуризация

```javascript
const [firstElement, 
  secondElement, 
  thirdElement = 3] = [1, 2];

console.log(firstElement);  // => 1
console.log(secondElement); // => 2
console.log(thirdElement);  // => 3
```