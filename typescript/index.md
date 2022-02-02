#TypeScript

##Компилятор
Код на TypeScript компилируется в JS 
и подходит для разработки любых проектов 
под любые браузеры — тем более что можно выбрать версию JS, 
в которую будет компилироваться код.

Основная задачи TypeScript принести типы в js.

```shell
#глобальная установка ts
npm i -g typescript
#конфигурация, которая описывает как мы компилируем в js
tsc --init
#компилируем
tsc
```

## Interfaces and Types
У Interfaces и Types есть три главных различия
1) Нельзя использовать implements для types, 
если присутствует оператор union.
```typescript
type Box = Shape | Figure
class MyBox implements Box {} // ошибка
```
2) Нельзя использовать одно имя для нескольких типов. 
Другими словами, нельзя расширить тип.
```typescript
//Свойства интерфейсов можно расширять
interface Test {
    a: number
}
interface Test {
    b: number
}
```
3) Нельзя наследовать тип от типа.
```typescript
interface Test{
    a:number
}
interface Test2 extends Test{
    b:string
}
// Теперь Test2 созержит и свойство a и свойство b
```

Рекомендуется использовать именно interfaces,
а не types

**Types** удобно использовать для создания своего типа,
с использованием union оператора
```typescript
type stringOrNumber = string | number
```
