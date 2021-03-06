let createError = require('http-errors');
let mongoose = require('mongoose');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let bodyParser = require('body-parser');
let passport = require('passport');
let config = require('./config/config');

let redis = require('redis');
let client = redis.createClient(config.port, config.host);
let responseTime = require('response-time');
// defined router model
let usersRouter = require('./routes/user.route');

let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);


mongoose.Promise = global.Promise

// configuration redis
client.on('error', (err) => { 
	console.log('' + err);
});

client.on('connect', () => {
	console.log('Redis is Ready')
});

client.on('message', (channel, message) => {
	// console.log('Server idle')
	console.log(channel);
	console.log(message)
})


// middleware response time
app.use(responseTime())

// view engine setup
app.use(bodyParser.urlencoded({ extended: true }))
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
	next()
})
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// setup middleware here
app.use(logger('combined'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// configuration url Service
// app.use('/', indexRouter)
app.use('/user', usersRouter)

// Connect to mongoDB
mongoose.connect(config.database, { useNewUrlParser: true }).then(() => console.log('MongoDB is Ready'))
	.catch((err) => console.error(err)
	);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404))
});

// passport
app.use(passport.initialize());
// app.use(passport.session());
require('./config/passport')(passport);
// event handler socket.io 

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.render('error')
})

module.exports = app
