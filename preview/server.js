module.exports = {
	route: '/favicon.ico',
	handle: function (req, res, next) {
		res.end('Hello, Componer!')
	},
}
