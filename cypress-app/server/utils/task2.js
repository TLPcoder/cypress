'use strict'

const task2 = async (ctx, next) => {
    // console.log('serial task 2')
    // ctx.answer = 2
    // ctx.body = 'task2'
    // return Promise.resolve(console.log('serial task 2'))
    // return new Promise(resolve => setTimeout(() => {
    //     resolve(console.log('serial task 2'))
    // }, 0));
    ctx.count = ctx.count + '2'
    return 2
}

module.exports = task2
