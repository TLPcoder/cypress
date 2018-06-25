'use strict'

const task = async (ctx, next) => {
    ctx.task = 'task here bro'
}

module.exports = task
