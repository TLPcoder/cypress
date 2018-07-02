'use strict'

const path = require('path')
const Utils = require('./utils')
const Tasks = require('./tasks')
const { compose } = require('koa-compose')
const Route = require('./route')

class Routes{
    constructor(app, router) {
        this.app = app,
        this.router = router
        this.utils = new Utils()
    }

    /**
     * loop through cypress config and create routes
    */
    
    createRoutes() {
        const config = this.utils.getConfig()
        const routes = config.routes

        for (let route in routes) {
            const { methods, middlewarePath, tasks } = routes[route]
            new Route(route, methods, middlewarePath, tasks).createRoute(this.router)
        }

        this.app.use(this.router.routes()).use(this.router.allowedMethods())
    }
}

module.exports = Routes