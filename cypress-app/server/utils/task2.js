'use strict'

const task = async (ctx) => {
    return new Promise(resolve => setTimeout(() => {
        resolve(console.log('seriel task 2'))
    }, 5000));
}

module.exports = task
