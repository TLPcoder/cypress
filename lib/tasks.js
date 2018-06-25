'use strict'
const path = require('path')
const Utils = require('./utils')

class Tasks {
    constructor(type){
        this.type = type // type will be route or middleware
        this.utils = new Utils()
    }
    // method === method or route if middleware method will be undefined
    runTasks(ctx, tasks, method) {
        const { parallel, seriel } =  tasks
        return Promise.all(
            [
                this.parallel(ctx, this.resolveTask(ctx, parallel, method)),
                this.seriel(ctx, this.resolveTask(ctx, seriel, method))
            ]
        )
    }

    resolveTask(ctx, tasks = [], method) {
        return tasks.map(task => {
            // recursively call nested tasks inside of a task
            if (task.tasks) {
                this.runTasks(ctx, task.tasks, method)
            }

            if (this.utils.checkMethod(method, task.methods) || this.type === 'middleware') {
                return require(path.normalize(`${this.utils.getConfigPath()}/${task.middleware}`))
            }

        })
    }

    parallel (ctx, tasks = []) {
        // runs all task parellel of eachother no dependencies
        return Promise.all(tasks.map(task => task(ctx)))
    }
    
    seriel (ctx, tasks = []) {
        // run task one after another assuming each task is dependent of each
        return tasks.map(async task => await task(ctx))
    }
}

module.exports = Tasks