const { readdirSync } = require('fs')
const Ascii = require('ascii-table')

const table = new Ascii().setHeading('Command', 'Status')
const path = require('path')

module.exports = (client) => {
    const fullPath = path.resolve(__dirname, `../commands/`)
    const commands = readdirSync(fullPath).filter((f) => f.endsWith('.js'))
    for (const file of commands) {
        // eslint-disable-next-line import/no-dynamic-require, global-require
        const pull = require(`../commands/${file}`)

        if (pull.name) {
            client.commands.set(pull.name, pull)
            table.addRow(file, '✅ Loaded!')
        } else {
            table.addRow(
                file,
                '❌ -> Command failed to load, please check your work again!'
            )
        }

        if (pull.aliases && Array.isArray(pull.aliases))
            pull.aliases.forEach((alias) => {
                return client.aliases.set(alias, pull.name)
            })
    }

    console.log(table.toString())
}
