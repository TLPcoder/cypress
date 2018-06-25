'use strict'

const task = async (ctx, next) => {
    console.log('parallel... suo 11111')
    ctx.task = 'task here bro'
}

module.exports = task
