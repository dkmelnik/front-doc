import emitter from "./awesome.mjs";

emitter.emit('connected')
emitter.emit('connected')

emitter.emit('msg', 'Какие-то аргументы')

emitter.emit('off')
emitter.emit('off')

emitter.emit('error', new Error('BOOM!'))