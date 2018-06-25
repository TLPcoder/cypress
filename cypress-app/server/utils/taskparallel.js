'use strict'

const task = async (ctx, next) => {
    console.log('parallel... suo 0000000')
    ctx.task = 'task here bro'
}

module.exports = task
