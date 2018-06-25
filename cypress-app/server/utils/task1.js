'use strict'

const task = async (ctx, next) => {
    return Promise.resolve(console.log('seriel task 1'))
}

module.exports = task
