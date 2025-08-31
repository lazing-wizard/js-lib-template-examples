//

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current', // Transforms into current Node.js version
        },
      },
    ],
  ],
};
