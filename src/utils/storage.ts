import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { app } from 'electron'

import { Schema } from '../types'

const fileName: string = 'config.json'
const dirPath: string = join(app.getPath('appData'), 'nvm-desk', 'storage')

const defaultSchema: Schema = {
    schemaVersion: '1.0.0',
    config: {
        dark: true
    }
}

export function createSchema() {
    if (!existsSync(dirPath)) {
        mkdirSync(dirPath)
    }
}

export function getSchema() {
    try {
        const data = readFileSync(join(dirPath, fileName))

        return JSON.parse(String(data))
    } catch (err) {
        console.error('[getSchema]: ', err)
    }
}

export function setSchema(schema = defaultSchema) {
    try {
        writeFileSync(join(dirPath, fileName), JSON.stringify(schema), 'utf8')
    } catch (err) {
        console.error('[setSchema]: ', err)
    }
}



