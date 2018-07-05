'use strict'

const task3 = async (ctx, next) => {
    console.log('serial task 3')
    // ctx.answer = 3
    // return 3
    // return Promise.resolve(console.log('serial task 3'))
    // return new Promise(resolve => setTimeout(() => {
    //     resolve(console.log('serial task 3'))
    // }, 0));
    ctx.count = ctx.count + '3'
    return 3
}

module.exports = task3
