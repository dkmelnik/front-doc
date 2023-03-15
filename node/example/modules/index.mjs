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
