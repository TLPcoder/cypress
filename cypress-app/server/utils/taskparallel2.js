'use strict'

const task = async (ctx, next) => {
    console.log('parallel... 2')
    ctx.task = 'task here bro'
}

module.exports = task
