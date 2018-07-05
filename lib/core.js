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
}

module.exports = Cypress