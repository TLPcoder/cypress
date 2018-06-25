'use strict'
const path = require('path')

class Utils{
    getPort() {
        const local = this.getConfig().local
        const nodePort = process.env.PORT
        return nodePort || local
    }

    getConfigPath(){
        return `${process.cwd()}/server/cypress.json`
    }

    getConfig(){
        return require(this.getConfigPath())
    }

    normalizeValues (arr) {
        return arr.map(method => method.toLowerCase())
    }

    checkMethod (method, methods){
        if (!methods) {
            return true
        }

        return this.normalizeValues(methods).includes(method.toLowerCase())
    }
}

module.exports = Utils