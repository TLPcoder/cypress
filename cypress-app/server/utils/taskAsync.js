'use strict'

const task = async (ctx, next) => {
    setTimeout(() => console.log('async... suo 000000'), 4000)
    ctx.task = 'task here bro'
}

module.exports = task
