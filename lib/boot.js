'use strict'

const path = require('path')
const Utils = require('./utils')
const fs = require('fs')

class Boot{
    constructor(app){
        this.app = app
        this.utils = new Utils()
    }
    
    /**
     * executes all the files in the boot folder
     */

    async runBoot() {
        const bootFolderPath = process.cwd() + '/server/boot'
        const files = fs.readdirSync(bootFolderPath)

        return Promise.all(files.map(async fileName => {
            const bootFunction = require(bootFolderPath + '/' + fileName)
            await bootFunction(this.app)
        }))
    }
}

module.exports = Boot