'use strict'

const downstream = (ctx) => {
    console.log('downstream bro')
    console.log('ctx.body', ctx.body)
} 

module.exports = downstream