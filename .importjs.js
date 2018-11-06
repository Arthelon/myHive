module.exports = {
  environments: ['browser', 'jest'],
  danglingCommas: false,
  importStatementFormatter({ importStatement }) {
    return importStatement.replace(/{ PropTypes }/, 'PropTypes').replace(/;$/, '');
  },
  useRelativePaths: false,
  namedExports: {
    'prop-types': ['PropTypes'],
  },
  aliases: {
    '@': 'src'
  },
  moduleNameFormatter({moduleName}) {
    if (moduleName.startsWith('src')) {
      return `@${moduleName.substring(3)}`
    } else {
      return moduleName
    }
  }
}
