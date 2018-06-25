'use strict'

const app = require('cypress')
console.log('app', app)

app.start(app => {
    console.log('running on port', app.port)
})