'use strict'

const path = require('path')
const Utils = require('./utils')
const Tasks = require('./tasks')

class Middleware{
    constructor(app, router) {
        this.app = app,
        this.router = router
        this.utils = new Utils()
        this.tasks = new Tasks('middleware')
    }

    /**
     * runs through creating the downstream and upstream middlewares
    */

    createMiddlewares() {
        const config = this.utils.getConfig()
        const { middleware } = config

        middleware.forEach(config => this.createMiddleware(config))
    }

    /**
     * creates cypress middlewares
     * @param {Object=} config
     * @param {Object=} config.tasks 
     * @param {String=} config.middleware path to middleware cb
     * @param {String=} config.type downstream or upstream
     * @param {Array=} config.paths middleware paths
     * @param {String=} config.paths can also be string if only one path
    */

    createMiddleware(config) {
        const router = this.router
        const { paths = ['/'], middlewarePath, tasks } = config
        const middleware = require(path.normalize(`${this.utils.getConfigPath()}/${middlewarePath}`))

        router.use(paths, async (ctx, next) => {
            
            if (tasks) {
                await this.tasks.runTasks(ctx, tasks)
            }
                
            await middleware(ctx, next)
        })
    }
}

module.exports = Middleware