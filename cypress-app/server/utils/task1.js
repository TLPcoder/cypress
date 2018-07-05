'use strict'

const task1 = async (ctx, next) => {
    console.log('serial task 1')
    // ctx.body = 'task1'
    // return Promise.resolve(console.log('serial task 1'))
    // return ctx
    ctx.count = ctx.count + '1'
    // return new Promise(resolve => setTimeout(() => {
    //     resolve(console.log('serial task 1'))
    // }, 0));
    return 1
}

module.exports = task1
