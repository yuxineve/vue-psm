module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    //'@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "generator-star-spacing": "off",
    "no-nuused-vars": "off",
    "quotes": "off",
    "eol-last": 0,
    "space-before-function-paren": 0 ,
    "tab_size": 4,
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
