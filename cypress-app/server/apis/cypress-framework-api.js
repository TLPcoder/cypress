'use struct'

const cypressFramework = async (ctx, next) => {
    ctx.body = 'cypress-framework-api responding'
}

module.exports = cypressFramework