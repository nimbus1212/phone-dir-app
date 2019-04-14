require('dotenv').config();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');



// Static Folder
app.use('*/js', express.static(path.join(__dirname, 'public/assets/js')))
app.use('*/css', express.static(path.join(__dirname, 'public/assets/css')))
app.use('*/images', express.static(path.join(__dirname, 'public/assets/images')))
app.use('*/fonts', express.static(path.join(__dirname, 'public/assets/fonts')))
app.use(express.static(path.join(__dirname, 'public')));
// app.use(favicon(path.join(__dirname, 'public/media', 'favicon.ico')))

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());

app.get('/', (req, res) => {
	res.render('index');
});

// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

//development error handler
//will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
	  res.status(err.status || 500);
	  res.render('error_dev', {
		message: err.message,
		error: err
	  });
	});
} else {
	// production error handler
	// no stacktraces leaked to user
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		if(err.status === 401){
			res.end(err.message);
		  
		}
		res.redirect('/');
	});
}
app.listen(process.env.PORT || 3000);
console.log('Server started at http://localhost:3000/');

module.exports = app;
