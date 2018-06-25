'use strict'

const downstream = (ctx) => {
    console.log('downstream')
    console.log('ctx.body', ctx.body)
} 

module.exports = downstream