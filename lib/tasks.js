'use strict'
const path = require('path')
const Utils = require('./utils')

class Tasks {

    /**
     * 
     * @param {String=} type will be 'route' or 'middleware'
     */

    constructor(type){
        this.type = type
        this.utils = new Utils()
    }

    /**
     * 
     * @param {Object=} ctx context object
     * @param {Object=} tasks 
     * @param {Object=} tasks.parallel tasks that can be run independent of another
     * @param {Object=} tasks.seriel tasks that need to be run one after another
     * @param {String=} method http 
     * @returns {Promise}
     */

    async runTasks(ctx, tasks, method) {
        const { parallel, seriel } =  tasks
        return Promise.all(
            [
                this.parallel(ctx, await this.resolveTask(ctx, parallel, method)),
                this.seriel(ctx, await this.resolveTask(ctx, seriel, method))
            ]
        )
    }

    /**
     * return array of task functions && recursively call nested tasks inside of a task
     * @param {Object=} ctx koa context object
     * @param {Array=} tasks 
     * @param {String=} method 
     * @returns {Array}
     */

    resolveTask(ctx, tasks = [], method) {
        return Promise.all(tasks.map(async task => {

            if (task.tasks) {
                await this.runTasks(ctx, task.tasks, method)
            }

            if (this.utils.checkMethod(method, task.methods) || this.type === 'middleware') {
                return require(path.normalize(`${this.utils.getConfigPath()}/${task.middleware}`))
            }

        }))
    }

    /**
     * runs all task in parallel
     * @param {Object=} ctx koa context object
     * @param {Array} tasks array of task functions
     * @returns {Promise} 
     */

    parallel (ctx, tasks = []) {
        // runs all task parellel of eachother no dependencies
        return Promise.all(tasks.map(async task => await task(ctx)))
    }

    /**
     * runs all task in seriel
     * @param {Object=} ctx koa context object
     * @param {Array} tasks array of task functions
     * @returns {Promise} 
     */
    
    seriel (ctx, tasks = []) {
        return tasks.reduce((promise, task) => (
            promise.then(() => task(ctx))
        ), Promise.resolve())
    }
}

module.exports = Tasks