'use strict'

const task = async (ctx, next) => {
    setTimeout(() => console.log('async...'), 5000)
    ctx.task = 'task here bro'
}

module.exports = task
