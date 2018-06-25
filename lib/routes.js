'use strict'

const path = require('path')
const Utils = require('./utils')
const Tasks = require('./tasks')

class Routes{
    constructor(app, router) {
        this.app = app,
        this.router = router
        this.utils = new Utils()
        this.tasks = new Tasks()
    }
    
    createRoutes() {
        const config = this.utils.getConfig()
        const routes = config.routes

        for (let route in routes) {
            this.createRoute(route, routes[route])
        }

        this.app.use(this.router.routes()).use(this.router.allowedMethods())
    }
    
    createRoute(route, config) {
        const router = this.router
        const { methods, middleware: middlewarePath, tasks } = config
        const cb = require(path.normalize(`${this.utils.getConfigPath()}/${middlewarePath}`))

        methods.forEach(async method => {
            router[method.toLowerCase()](route, async (ctx, next) => {
                
                if (tasks) {
                    await this.tasks.runTasks(ctx, tasks, method)
                }

                cb(ctx, next)
            })
        })
    }
}

module.exports = Routes