export default {
  dev: {
    proxy: {
      '/api': {
        target: 'http://localhost:17283',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
