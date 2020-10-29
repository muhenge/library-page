module.exports = {
  plugins: [
    require('autoprefixer'),
    require('tailwindcss'),
    require('@fullhuman/postcss-purgecss')({
      content: [
        './public/**/*.html',
        './public/JS/*.js',
        './public/CSS/*.css',
      ],
      defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || []
    })
  ]
}


