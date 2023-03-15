## Основные отличия между *commonjs* и *es modules*:

*COMMONJS*
- require в любом месте
- можно использовать в условии
- нет асинхронной загрузки

Для использования модулей в приложении мы можем:
- указать в package.json type commonjs
- использовать файлы с расширением .cjs

*ES MODULES*
- импорт на верхнем уровне
- импорт нельзя использовать в условии
- есть возможность асинхронной загрузки

Для использования модулей в приложении мы можем:
- указать в package.json type module
- использовать файлы с расширением .mjs


## COMMONJS
Для экспорта в CommonJS используются глобальные объекты module и exports.
Для этого необходимо просто добавить новое поле в объект exports.
```js
// awesome.js
module.exports.awesomeValue  = 42;
module.exports.getCurrentDate = () => {
    return new Date()
}
```
```js
// index.js
const {awesomeValue, getCurrentDate} = require('./awesome');

console.log({
    awesomeValue,
    getCurrentDate: getCurrentDate()
})
```
Для удобства экспорта части фунциональности 
в глобальной области существует переменная exports,
которая является ссылкой на module.exports. 
Поэтому возможен и такой синтаксис экспорта:

```js
// awesome.js
exports.awesomeValue  = 42;
exports.getCurrentDate = () => {
    return new Date()
}
```

Стоит обратить внимание, что если были экспортированы части модуля,
они затрутся и будет
экспортировано только последнее значение module.exports:

```js
exports.counter = function () { /* ... */ }  

exports.awesomeValue = 42;

module.exports = {};

// counter и awesomeValue не будут экспортированы
```
## ES MODULES

### Именованный импорт/экспорт

В случае, когда необходимо экспортировать несколько сущностей из модуля, 
применяется именованный экспорт. 
Он выполняется с помощью инструкции **export**.

**export** можно использовать в момент объявления функции, переменной или класса:

```js
// file awesome.mjs
export const awesomeValue  = 42;
export const getCurrentDate = () => {
    return new Date()
}
```

Для больших модулей удобнее использовать группированный экспорт,
это позволяет наглядно увидеть все
экспортируемые сущности внутри модуля:

```js
// file awesome.mjs
const awesomeValue  = 42;
const getCurrentDate = () => {
    return new Date()
}
export { awesomeValue, getCurrentDate };
```

Чтобы импортировать какой-либо метод, необходимо 
воспользоваться инструкциeй **import**, 
указав интересующие части модуля и путь до него:
```js
// file index.mjs
import {awesomeValue, getCurrentDate} from './awesome.mjs';

console.log(awesomeValue, getCurrentDate())
```

### Импорт/Экспорт по умолчанию
В случае, когда из файла модуля экспортируется только одна сущность, 
удобнее использовать экспорт по умолчанию. 
Для этого необходимо добавить default после инструкции export:
```js
// file awesome.mjs
const getCurrentDate = () => {
    return new Date()
}

export default getCurrentDate;
```

Импорт модуля в случае экспорта по умолчанию:
```js
// file index.mjs
import getCurrentDate from "./awesome.mjs";

console.log(getCurrentDate())
```
### Переименование в момент импорта/экспорта
Для изменения имени метода в момент 
импорта/экспорта существует инструкция **as**:
```js
// file awesome.mjs
const getCurrentDate = () => {
    return new Date()
}

export {getCurrentDate as curDate};
```
Импорт этой функции будет доступен только по новому имени:
```js
// file index.mjs
import {curDate} from "./awesome.mjs";

console.log(curDate())
```

Этот синтаксис полезен для случаев, когда имя импортируемой 
части уже занято. Также можно сократить имя 
функции/переменной/класса, если она часто используется в файле:

```js
import { debounce } from 'shared';
import { debounce as _debounce } from 'lodash';
import { awesomeFunctionThatYouNeed as _helper } from 'awesome-lib';
```


```js
// file awesome.mjs
const awesomeValue  = 42;
const getCurrentDate = () => {
    return new Date()
}

export default getCurrentDate;
```
```js
// file index.mjs
import { default as curDate } from "./awesome.mjs";

console.log(curDate())
```

### Инициализация модуля без импорта его частей
Используется, когда необходимо выполнить 
импорт модуля для выполнения кода внутри него, 
но не импортировать какую-либо его часть:
```js
// file awesome.mjs
const a = 1
const b = 4

const c = a + b

console.log(c)
```
```js
// file index.mjs
import "./awesome.mjs"; // log 5
```

### Импорт всего содержимого модуля
Можно импортировать всё содержимое модуля
в переменную и обращаться к частям модуля
как к свойствам этой переменной:
```js
// file awesome.mjs
const awesomeValue  = 42;
const getCurrentDate = () => {
    return new Date()
}
export { awesomeValue, getCurrentDate };
```

```js
// file index.mjs
import * as awesome from './awesome.mjs';
console.log(awesome.awesomeValue)
```
Такой синтаксис не рекомендуется использовать, 
сборщик модулей (например, Webpack) не сможет корректно 
выполнить tree-shaking(*удаления мертвого кода, 
опирается на операторы импорта и экспорта , чтобы определить,
экспортируются и импортируются ли модули кода для использования 
между файлами JavaScript) при таком использовании.

### Динамические импорты
Кроме «статических» импортов можно загружать модули ассинхронно,
для этого есть специальное выражение import(). 
Пример использования:

```js
// file awesome.mjs
const awesomeValue  = 42;
const getCurrentDate = () => {
    return new Date()
}

export {awesomeValue, getCurrentDate};
```

```js
// file index.mjs
const main = async () => {
    try {
        const module = await import('./awesome.mjs')
        return module.awesomeValue;
    }catch (e) {
        console.log(e)
    }
}

const res = async () => {
    const v = await main()
    return v + 2
}

console.log(await res())
```