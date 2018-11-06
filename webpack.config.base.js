import path from 'path'

export default {
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    modules: [__dirname, 'node_modules']
  }
}
