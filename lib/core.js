'use strict'
const Koa = require('koa')
const Router = require('koa-router')
const path = require('path')
const Utils = require('./utils')
const Routes = require('./routes')
const Middleware = require('./middleware')

class Cypress{
    constructor() {
        this.utils = new Utils()
        this.app = new Koa()
        this.router = new Router()
        this.middleware = new Middleware(this.app, this.router)
        this.routes = new Routes(this.app, this.router)
        this.port = this.utils.getPort()
    }

    async start(cb) {
        await this.middleware.createMiddlewares()
        await this.routes.createRoutes()
        await this.app.listen(this.port, cb(this))
    }
}

module.exports = Cypress