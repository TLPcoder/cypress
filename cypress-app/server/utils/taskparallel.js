'use strict'

const task = async (ctx, next) => {
    console.log('parallel... 0')
    ctx.task = 'task here bro'
}

module.exports = task
