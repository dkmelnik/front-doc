## Жизненный цикл компонента в React

### Этап № 1: монтирование
Как известно, компоненты, созданные на основе классов, тоже являются классами. Именно поэтому первый запускаемый метод — constructor(). Как правило, именно в constructor() мы выполняем инициализацию состояния компонента.

Далее компонент запускает getDerivedStateFromProps(), потом запускается render(), возвращающий JSX. React «монтируется» в DOM. Следующий этап — запуск метода componentDidMount(). Тут происходит выполнение всех асинхронных вызовов к базам данных. Итак, компонент «рожден».

### Этап № 2: обновление
Данный этап запускается во время каждого изменения состояния либо свойств. Как и в случае с монтированием, происходит вызов метода getDerivedStateFromProps(), однако в этот раз уже без constructor().

Потом происходит запуск shouldComponentUpdate(). Тут можно выполнять сравнение старых свойств с новым перечнем свойств либо сравнивать состояния. При этом мы можем указать, надо ли отображать компонент заново, возвращая true либо false — это даст возможность сделать приложение более эффективным благодаря уменьшению числа лишних отображений. Если же shouldComponentUpdate() возвращает false, этап обновлений завершается.

В обратном случае React отобразится заново, а потом запустится getSnapshotBeforeUpdate(). Потом React запустит componentDidUpdate(). Как и в случае с componentDidMount(), его можно применять для асинхронных вызовов либо управления DOM.

### Этап № 3: размонтирование

Все хорошее имеет тенденцию заканчиваться. Когда компонент прожил свою жизнь, наступает размонтирование — последний жизненный этап. Во время удаления компонента из DOM React выполняет запуск componentWillUnmount() непосредственно перед удалением. Данный метод применяется при закрытии всех открытых соединений типа web-сокетов либо тайм-аутов.


## Хуки 

### jsx
Именно благодаря ему у функциональных компонентов появилось состояние.

```javascript
const App = () => {
  const [value, valueChange] = useState(0);
 
  return (
    <div>
      {value}
      <button onClick={() => valueChange(value + 1)}>
        Увеличить значение на 1
      </button>
    </div>
  );
};
```

### useContext

Чтобы передать какие-то данные в компонент, мы можем использовать props. Но есть и альтернативный способ – context.
Используются, чтобы не протаскивать (drops drilling) через все
дочерние porps. 

Все вложенные в компонент который использует данный хук,
компоненты смогут получить доступ к данным, которые мы передаем, помещая их в параметр value. 

```jsx
import {createContext, useContext} from "react";

const MyContext = createContext("without provider");
 
const External = () => {
  return (
    <MyContext.Provider value="Hello, i am External">
      <Intermediate />
    </MyContext.Provider>
  );
};
 
const Intermediate = () => {
  return <Internal />;
};
 
const Internal = () => {
  const context = useContext(MyContext);
 
  return `I am Internal component. I have got the message from External: "${context}"`;
};
```

### useEffect, useLayoutEffect
В случае с useLayoutEffect React не запускает рендеринг построенного DOM дерева до тех пор, пока не отработает useLayoutEffect. Если же мы берём useEffect, то React сразу запускает рендеринг построенного DOM, не дожидаясь запуска useEffect.

useEffect принимает в себя два аргумента:

- callback. Внутри него вся полезная нагрузка, которую мы хотим описать. Например, можно делать запросы на сервер, задание обработчиков событий на документ или что-то ещё;
- массив, состоящий из аргументов. При изменении значения внутри любого из них будет запускаться наш callback. Именно благодаря этому аргументу мы можем имитировать методы жизненного цикла.
```jsx
 useEffect(() => {
    console.log("componentDidUpdate");
  }, [data]);
```
При размонтирование или ререндере компонента, нам нужно 
отвязать обработчики событий

```jsx
const App = ({data}) => {
  useEffect(() => {
    return () => {
      console.log("componentWillUnmount");
    };
  }, []);
 
  return null;
};
```


### useRef
Бывают ситуации, когда необходимо обратиться 
к какому-то DOM-объекту напрямую. 
Для этого существует хук useRef.
`useRef` - даст один и тот же объект с рефом при каждом рендере.
Далее мы можем взаимодействовать
с Dom-объектом напрямую,
как если бы мы нашли его с помощью селектора.
---
Мы могли бы написать так.

Хранить ссылку на `ul` элемент в 
переменной `ulElem`.
На при каждом ререндере, компонент и все вложенные
переменные и функции будут пересоздаваться и в 
переменной `ulElem` окажется undefined.

```tsx
export const App = () => {
  let ulElem: HTMLUListElement | null;
  const [numbers, setNumbers] = useState([1,2,3,4,5]);
  const addNumber = ():void => {
    const lastEl = numbers[numbers.length - 1];
    setNumbers([...numbers, lastEl + 1]);
  };
  const handleScroll = () => {
    console.log('Скролл');
  };
  useEffect(() => {
    ulElem = document.querySelector('ul');
    ulElem?.addEventListener('scroll', handleScroll);
  }, []);
  const removeScroll = () => {
    ulElem?.removeEventListener('scroll', handleScroll);
  };
  return (
    <div className={styles.container}>
      <ul className={styles.ul}>
        {numbers.map((item) => (
          <li key={item}> {item} </li>
        ))}
      </ul>
      <button onClick={addNumber}>добавить число</button>
      <button onClick={removeScroll}>удалить слушатель</button>
    </div>
  );
};
```
Правильно использовать хук `useRef`

```tsx
export const App = () => {
    const [numbers, setNumbers] = useState([1,2,3,4,5]);

    const ulRef = useRef<HTMLUListElement>(null);
    const addNumber = ():void => {
        const lastEl = numbers[numbers.length - 1];
        setNumbers([...numbers, lastEl + 1]);
    };
    const handleScroll = () => {
        console.log('Скролл');
    };
    useEffect(() => {
        ulRef?.current?.addEventListener('scroll', handleScroll);
    }, []);
    const removeScroll = () => {
        ulRef?.current?.removeEventListener('scroll', handleScroll);
    };
    return (
        <div className={styles.container}>
            <ul className={styles.ul} ref={ulRef}>
                {numbers.map((item) => (
                    <li key={item}> {item} </li>
                ))}
            </ul>
            <button onClick={addNumber}>добавить число</button>
            <button onClick={removeScroll}>удалить слушатель</button>
        </div>
    );
};
```

### useCallback
В силу того, что функциональный компонент – это функция,
при каждом рендеринге запускается всё,
что объявлено в ней. Ссылки на все переменные
и функции компонента изменятся.
Из примера выше, видно, что при ререндере
функция 
```js
const handleScroll = () => {
        console.log('Скролл');
    };
```
получит другую ссылку, мы не сможем удалить слушатель
скролла.

Хук `useCallback` вернёт мемоизированную версию колбэка, 
который изменяется только, 
если изменяются значения одной из зависимостей.
Если мы не хотим чтобы функция пересоздавалась
оставляем пустым массив зависимостей [],
при этом внутри функции все переменные и значения
будут равны значением на момент мемоизирования функции.
Чтобы у функции были актуальные данные,
создадим `ref` и присвоим ему значение из
переменной состояния.
```tsx
export const App = () => {
    const [numbers, setNumbers] = useState([1,2,3,4,5]);

    const ulRef = useRef<HTMLUListElement>(null);

    const numsRef = useRef<number[] | null>(null);
    numsRef.current = numbers;

    const addNumber = ():void => {
        const lastEl = numbers[numbers.length - 1];
        setNumbers([...numbers, lastEl + 1]);
    };

    const handleScroll = useCallback(() => {
        console.log('Скролл', numsRef.current);
    }, []);

    useEffect(() => {
        ulRef?.current?.addEventListener('scroll', handleScroll);
    }, []);
    const removeScroll = () => {
        ulRef?.current?.removeEventListener('scroll', handleScroll);
    };
    return (
        <div className={styles.container}>
            <ul className={styles.ul} ref={ulRef}>
                {numbers.map((item) => (
                    <li key={item}> {item} </li>
                ))}
            </ul>
            <button onClick={addNumber}>добавить число</button>
            <button onClick={removeScroll}>удалить слушатель</button>
        </div>
    );
};
```
### useReducer

Разработчикам React так понравился Redux, что они решили добавить его аналог в состав React. Этот хук позволяет вынести данные из компонентов.

```jsx
import {useReducer} from "react";
 
const initialState = {count: 0};
 
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return {
        ...state,
        count: state.count + 1,
      };
    case "decrement":
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      throw new Error();
  }
}
 
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
 
  return (
    <>
      {state.count}
      <button onClick={() => dispatch({type: "decrement"})}>-</button>
      <button onClick={() => dispatch({type: "increment"})}>+</button>
    </>
  );
};
```
У него есть преимущество: вне зависимости от того, как компоненты нашего приложения будут вложены друг в друга, мы сможем отобразить данные в любом компоненте.

### useMemo

Этот хук позволяет не производить одни и те 
же вычисления много раз.
В этой ситуации компонент перерендеривается в том случае,
если изменяется один из параметров – a или b. 
Представим, что у нас много раз изменяется 
параметр b, при этом параметр a остаётся прежним. 
В таком случае мы много раз вычисляем одно и то же 
произведение, которое помещаем в переменную sqrt.
Тут нам и помогает useMemo

```jsx
const MyComponent = ({a, b}) => {
  const sqrt = useMemo(() => a * a, [a]);
  return (
    <div>
      <div>А в квадрате: {sqrt}</div>
      <div>B: {b}</div>
    </div>
  );
};
```

### React.memo

React.memo — это компонент высшего порядка.
Если ваш компонент всегда рендерит одно и то
же при неменяющихся пропсах, 
вы можете обернуть его в вызов 
React.memo для повышения производительности в некоторых 
случаях, мемоизируя тем самым результат. 
Это значит, что React будет использовать 
результат последнего рендера,
избегая повторного рендеринга.

```tsx
function MyComponent(props) {
  /* рендер с использованием пропсов */
}
function areEqual(prevProps, nextProps) {
  /*
  возвращает true, если nextProps рендерит
  тот же результат что и prevProps,
  иначе возвращает false
  */
}
export default React.memo(MyComponent, areEqual);
```

## HOC 

Компонент высшего порядка - функция которая принимает
компонент и возвращает новый компонент.


Это удобный способ переиспользования логики.

Используется паттерн **Прокси**.

```tsx
const withLayout = <T extends Record<string, unknoun>>(Component: FunctionComponent<T>) => {
    return function widthLayoutComponent(props: T): JSX.Element {
        return <Component {...props}>
    }
}
```


