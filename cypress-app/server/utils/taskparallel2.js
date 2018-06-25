'use strict'

const task = async (ctx, next) => {
    console.log('parallel... suo 2222')
    ctx.task = 'task here bro'
}

module.exports = task
