const OS = require('os');
const os = require("os");
const crypto = require("crypto")

process.env.UV_THREADPOOL_SIZE = os.cpus().length.toString()

const start = performance.now()

for (let i = 0; i < 50; i++){
    crypto.pbkdf2('test', 'salt', 100000, 64, 'sha512', () => {
        console.log(performance.now() - start)
    })
}
