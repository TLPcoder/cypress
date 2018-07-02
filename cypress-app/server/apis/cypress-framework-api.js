'use struct'

const cypressFramework = async (ctx, next) => {
    Promise.resolve().then(() => {
        ctx.body = 'cypress-framework-api responding'
    })
}

module.exports = cypressFramework