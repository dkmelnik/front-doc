console.log('test')

setTimeout(() => console.log('setTimeout'),0)

setImmediate(function immediate () {
    console.log('immediate');
});

Promise.resolve('promise').then(r => console.log(r))

console.log('test2')
