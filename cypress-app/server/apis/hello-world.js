'use struct'
const cypress = require('cypress')

const helloWorld = async (ctx, next) => {
    const { serial, parallel, task1, task2, task3, task4 } = ctx.state
    const tasks = [task1, task2]
    await parallel(serial(task1, task2, task3, task4), task1, task1, task4, task4)()
    ctx.body = ctx.count
}

module.exports = helloWorld