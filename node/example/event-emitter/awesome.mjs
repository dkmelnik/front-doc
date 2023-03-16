import EventEmitter from "events";

const emitter = new EventEmitter()

const log = () => console.log('connected')

emitter.addListener('connected', log)
emitter.on('msg', (data) => console.log(`Получил: ${data}`));
emitter.once('off', () => console.log('вызываю 1 раз, не больше'))

emitter.setMaxListeners(1)
emitter.on('error', (error) => console.error(`error: ${error.message}`));


const target = new EventTarget()

const logTarget = () => {
    console.log('connected to target')
}

export default emitter;