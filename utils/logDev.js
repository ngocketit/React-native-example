function logDev () {
  if (process.env.NODE_ENV === 'development') {
    const logLevel = arguments[0] || 'log'
    console[logLevel].apply(null, [].slice.apply(arguments, [1]))
  }
}

export function log () {
  logDev('log', ...arguments)
}

export function logError () {
  logDev('error', ...arguments)
}

export function logDebug () {
  logDev('debug', ...arguments)
}
