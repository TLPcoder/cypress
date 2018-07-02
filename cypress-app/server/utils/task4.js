'use strict'

const task4 = async (ctx) => {
    // console.log('serial task 4')
    // ctx.answer = 4
    // return 4
    // return Promise.resolve(console.log('serial task 4'))
    // return new Promise(resolve => setTimeout(() => {
    //     resolve(console.log('serial task 4'))
    // }, 0));
    ctx.count = ctx.count + '4'
    return 4
}

module.exports = task4
