module.exports = {
    plugins: [
      require('autoprefixer')({
        grid: true,
        flexbox: true
      }),
      require('postcss-preset-env')({
        browsers: [
          '>0.2%',
          'not dead',
          'not op_mini all',
          'ie 11'
        ],
        stage: 3
      }),
      require('postcss-rtl')({
        // Add any custom RTL options here
      })
    ]
  };