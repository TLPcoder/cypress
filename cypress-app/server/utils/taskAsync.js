'use strict'

const task = async (ctx, next) => {
    setTimeout(() => console.log('async... 0'), 4000)
    ctx.task = 'task here bro'
}

module.exports = task
