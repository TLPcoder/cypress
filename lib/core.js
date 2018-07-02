'use strict'
const Koa = require('koa')
const Router = require('koa-router')
const path = require('path')
const Utils = require('./utils')
const Boot = require('./boot')
const Routes = require('./routes')
const Middleware = require('./middleware')

class Cypress{
    constructor() {
        this.utils = new Utils()
        this.app = new Koa()
        this.router = new Router()
        this.boot = new Boot(this)
        this.middleware = new Middleware(this.app, this.router)
        this.routes = new Routes(this.app, this.router)
        this.port = this.utils.getPort()
        this.config = this.utils.getConfig()
    }

    /**
     * runs boot create middlewar and routes then starts the node server
     * @param {Function=} cb 
     */

    async start(cb) {
        await this.boot.runBoot()
        // await this.middleware.createMiddlewares()
        await this.routes.createRoutes()
        await this.app.listen(this.port, cb(this))
    }

    /**
     * runs all task in parallel
     * @param {Object=} ctx koa context object
     * @param {Array} tasks array of task functions
     * @returns {Promise} 
     */

    parallel (...tasks) {
        // runs all task parellel of eachother no dependencies
        return Promise.all(tasks.map(async task => {

            if (task instanceof Promise) {
                return task
            }

            return await task()
        }))
    }

    /**
     * runs all task in serial
     * @param {Object=} ctx koa context object
     * @param {Array} tasks array of task functions
     * @returns {Promise} 
     */

    serial (...tasks) {
        return tasks.reduce((promise, task) => {

            if (task instanceof Promise) {
                return promise.then(() => task)
            }

            return promise.then(() => task())
        }, Promise.resolve()).catch(err => console.log(err))
    }
}

module.exports = Cypress