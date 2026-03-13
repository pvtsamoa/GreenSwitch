const chalk = require('chalk')

function timestamp() {
  return new Date().toISOString()
}

module.exports = {
  info: (...args) => {
    console.log(chalk.blue(`[${timestamp()}] [INFO]`), ...args)
  },

  success: (...args) => {
    console.log(chalk.green(`[${timestamp()}] [SUCCESS]`), ...args)
  },

  warn: (...args) => {
    console.log(chalk.yellow(`[${timestamp()}] [WARN]`), ...args)
  },

  error: (...args) => {
    console.log(chalk.red(`[${timestamp()}] [ERROR]`), ...args)
  },

  debug: (...args) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(chalk.gray(`[${timestamp()}] [DEBUG]`), ...args)
    }
  }
}