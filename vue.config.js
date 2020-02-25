module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/calculator/' : '/',
  transpileDependencies: ['vuex-module-decorators'],
}
