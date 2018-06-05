const logger = require('./logger')

logger('This is an informational message')
logger.verbose('This is a verbose message')

const Logger = require('./logger2')
const dbLogger = Logger('DB')
dbLogger.info('This is an informational message')
const accessLogger = new Logger('ACCESS')
accessLogger.verbose('This is a verbose message')