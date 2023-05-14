const { createProxyMiddleware } = require('http-proxy-middleware');

const proxy = {
	target: 'http://localhost:3500',
	changeOrigin: true,
};

const authProxy = {
	target: 'http://localhost:7000',
	changeOrigin: true,
};

module.exports = function (app) {
	app.use('/api', createProxyMiddleware(proxy));
	app.use('/auth', createProxyMiddleware(authProxy));
};
