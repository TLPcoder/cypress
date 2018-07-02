'use strict'

const path = require('path')

class Route{
    constructor(route, methods, middlewarePath, tasks){
        this.route = route
        this.methods = methods
        this.middlewarePath = middlewarePath
        this.tasks = tasks
    }

    getMiddleware() {
        return require(path.normalize(`${process.cwd()}/${this.middlewarePath}`))
    }

    createRoute(router) {
        this.methods.forEach(method => {
            router[method.toLowerCase()](this.route, async (ctx, next) => {
                this.appendConfig(ctx, this.tasks)
                ctx.state.parallel = this.parallel(ctx, next)
                ctx.state.serial = this.serial(ctx, next)
                return this.getMiddleware()(ctx, next)
            })
        })
    }

    appendConfig(ctx, tasks) {

        for (let key in tasks) {
            ctx.state[key] = this.resolveTask(tasks[key])
        }

    }

    resolveTask(task) {
        if (typeof task === 'string') {

            if (task.includes('/')) {
                return require(path.normalize(`${process.cwd()}/${task}`))
            }

            return require(task)
        } 

        return task
    }

    parallel (ctx, next) {
        return (...tasks) => {
            return Promise.all(tasks.map(async task => {

                if (task instanceof Promise) {
                    return task
                }
                
                return await task(ctx, next)
            }))
        }
    }

    serial (ctx, next) {
        return (...tasks) => {
            return tasks.reduce((promise, task) => {

                if (task instanceof Promise) {
                    return promise.then(() => task)
                }

                return promise.then(() => task(ctx, next))
            }, Promise.resolve()).catch(err => Promise.reject(err))
        }
    }
}

module.exports = Route