'use struct'

const helloWorld = async (ctx, next) => {
    ctx.body = 'helloWorld ' + ctx.task
}

module.exports = helloWorld