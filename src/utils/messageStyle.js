const MessageStyle = {
    style(language, message) {
        return `\`\`\`${language}\n${message}\`\`\``
    },
    error(message) {
        return this.style('diff', `-${message}`)
    },
    warn(message) {
        return this.style('fix', message)
    },
    green(message) {
        return this.style('css', message)
    },
    darkGreen(message) {
        return this.style('bash', message)
    },
    blue(message) {
        return this.style('ini', `[${message}]`)
    },
    bash(message) {
        return this.style('bash', message)
    },
    markDown(message) {
        return this.style('md', message)
    },
    nim(message) {
        return this.style('nim', message)
    },
}

module.exports = MessageStyle
