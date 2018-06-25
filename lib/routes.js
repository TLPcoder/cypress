'use strict'

const path = require('path')
const Utils = require('./utils')
const Tasks = require('./tasks')

class Routes{
    constructor(app, router) {
        this.app = app,
        this.router = router
        this.utils = new Utils()
        this.tasks = new Tasks('route')
    }

    /**
     * loop through cypress config and create routes
    */
    
    createRoutes() {
        const config = this.utils.getConfig()
        const routes = config.routes

        for (let route in routes) {
            this.createRoute(route, routes[route])
        }

        this.app.use(this.router.routes()).use(this.router.allowedMethods())
    }
    /**
     * creates cypress routes
     * @param {String=} route the routes path
     * @param {Object=} config 
     * @param {Object=} config.tasks the tasks for the route
     * @param {String=} config.middleware path to middleware callback
     * @param {Array=} config.methods list of http verbs
    */

    createRoute(route, config) {
        const router = this.router
        const { methods, middleware: middlewarePath, tasks } = config
        const middleware = require(path.normalize(`${this.utils.getConfigPath()}/${middlewarePath}`))

        methods.forEach(method => {
            router[method.toLowerCase()](route, async (ctx, next) => {
                
                if (tasks) {
                    await this.tasks.runTasks(ctx, tasks, method)
                }

                middleware(ctx, next)
            })
        })
    }
}

module.exports = Routes