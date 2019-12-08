module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ]
  ],
  "plugins": [
    ["ramda"],
    ["@babel/plugin-syntax-dynamic-import"]
  ]
};