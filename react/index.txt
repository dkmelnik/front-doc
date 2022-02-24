// Ramda

// Типизировать и написать Generic
const head = <T>(array: T[]): <T | underfined> => Array.isArray(array) ? array[0] : void 0

// ## 2
const arr = [1,1, [1, [1, [1, [2]]]], [1]]

const sum = (arr1) => {
  let count = 0;


  arr1.map((el)=> {
     if(!Array.isArray(el)){
      count += el
    } else {
      count +=  sum(el)
      }
  })


  return count;
}

// console.log(sum(arr))

// ## 4
var arr1 = "john".split('');
var arr2 = arr1.reverse();


console.log(arr1)
console.log(arr2)

console.log(arr1 === arr2) //true
// ## 5

[1,2,3].map(console.log)


// ## 6
var v = 0;
const filter = by => order => [a,b].join('');

const filterByClint = v2('client');


filterByClint('ASC')



// React

const Component = React.memo(() => {

  const value = useSelector(someSelector.value);

  const logHandler = () => useCallback(console.log(value), [value])

  return useMemo(() => {
    return (
       <div onClick={logHandler}>
      123
    </div>
    )
  }, [logHandler])

})

const Counter = () => {
  const [count,setCount]=useState(0);


  const clickHandler = () => {
    setCount(count + 1)
    setCount(count + 1)
    setCount(count + 1)
    setCount((prev) => prev + 1)
  }


  return <button onClick={clickHandler}>{count}</button>
}



useEffect(() => {
 console.log(1);
});


useLayoutEffect(() => {
 console.log(2);
});

useEffect(() => {
 setTimeout(() => console.log(3), 0);
});

useLayoutEffect(() => {
 console.log(4);
});