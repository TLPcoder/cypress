'use strict'

class Utils{

    /**
     * return the port number for the node server
     * @return {String} 
    */

    getPort() {
        const local = this.getConfig().local
        const nodePort = process.env.PORT
        return nodePort || local
    }

    /**
     * returns path to the cypress config
     * @return {String}
    */

    getConfigPath(){
        return `${process.cwd()}/server/cypress.json`
    }

    /**
     * returns cypress config
     * @return {Function}
    */

    getConfig(){
        return require(this.getConfigPath())
    }

    /**
     * 
     * @param {Array=}  arr list of values to normalize
     * @return {Array}
    */

    normalizeValues (arr) {
        return arr.map(method => method.toLowerCase())
    }

     /**
     * 
     * looks if method is in the list of methods
     * @param {String=} method http verb
     * @param {Array=} methods list of http verbs
     * @returns {Boolean=} 
     */

    checkMethod (method, methods){
        return this.normalizeValues(methods).includes(method.toLowerCase())
    }
}

module.exports = Utils