function buildConfig (env) {
  process.env.NODE_ENV = env
  return require('./webpack/webpack.' + env + '.js')({ env: env })
}
module.exports = buildConfig
