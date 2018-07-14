require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const https = require('https')
app.use(bodyParser.json());

app.use(morgan('dev'));

// Whitelist owned domains or null/file domains and disallow others
var whitelist = ['null', 'file://', 'http://shashwatgulyani.me', 'https://shashwatgulyani.me', 'https://shashabot.github.io', 'http://127.0.0.1:8080'];
var corsOptions = {
	origin: function(origin, callback) {
		if (!origin) return callback(null, true);
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	},
	credentials: true
}
app.use(cors(corsOptions));

const handleIntent = require('./handleIntent')
app.post('/api/detectIntent', (req, res) => {
	handleIntent(req.body.queryText, (err, result) => {
		if (err) {
			console.log(err)
			return res.json({ success: false }).end()
		}
		res.json({ success: true, result }).end()
	})
})


if(process.env.HTTPS) {
	let serverOpts = {
		key: fs.readFileSync(process.env.SSL_PRIVATE_KEY),
		cert: fs.readFileSync(process.env.SSL_CERT)
	}

	let httpsServer = https.createServer(serverOpts, app)
	httpsServer.listen(443, () => {
		console.log('Secure server started on port 443')
	})
}
else {
	// Start server on port in env (if given), else port 8000
	const port = process.env.PORT || 8000
	const server = app.listen(port, () => {
		console.log('Server started on port ' + port)
	})
}