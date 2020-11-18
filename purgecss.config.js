module.exports = {
  css: ['./CSS/style.css'],
  content: [
    './public/**/*.html',
    './public/JS/*.js',
    './CSS/*.css',
  ],
  defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
};
