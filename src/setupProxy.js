const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    '/api/v1',
    createProxyMiddleware({
      target: 'http://0.0.0.0:8070',
      secure: false,
      changeOrigin: true,
      pathRewrite: { '^/api/v1/': '/' },
    })
  );
};
