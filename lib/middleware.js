'use strict'

const path = require('path')
const Utils = require('./utils')
const Tasks = require('./tasks')

class Middleware{
    constructor(app, router) {
        this.app = app,
        this.router = router
        this.utils = new Utils()
        this.tasks = new Tasks()
    }
    
    createMiddlewares() {
        const config = this.utils.getConfig()
        const { downstreamMiddleware: downstream, upstreamMiddleware: upstream } = config

        downstream.forEach(config => this.createMiddleware({ ...config, type: 'downstream'}))

        upstream.forEach(config => this.createMiddleware({ ...config, type: 'upstream' }))
    }

    createMiddleware(config) {
        const router = this.router
        const { paths = '/', middleware: middlewarePath, tasks, type } = config
        const middleware = require(path.normalize(`${this.utils.getConfigPath()}/${middlewarePath}`))

        router.use(paths, async (ctx, next) => {
            
            if (tasks) {
                await this.tasks.runTasks(ctx, tasks)
            }

            if (type === 'upstream') {
                await next()
                middleware(ctx)
            }

            if (type === 'downstream') {
                middleware(ctx)
                await next()
            }
        })
    }
}

module.exports = Middleware