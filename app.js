var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var fs = require("fs");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.engine('.html',requrie('ejs').__express);
app.set('view engine','html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(multer({dest:'/tmp/'}).array('image')); //上传文件中间件--和.netCore注册中间件类同
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/wj',function(req,res){
  res.send("i have a apple");
});

//get请求
app.get('/api/getUsers',function(req,res){
    let response = {
      "first_name":req.query.firstName,
      "last_name":req.query.lastName
    }
    res.send(response);
});

//post请求
app.post("/api/postUsers",function(req,res){
    let response = {
      "first_name":req.body.first_name,
      "last_name":req.body.last_name
    };
    res.send(JSON.stringify(response));
});

//上传文件
app.post('/file_upload',function(req,res){
  var des_file = __dirname + "/" + req.files[0].originalname;
  fs.readFile(req.files[0].path,function(err,data){
    if(err){
      console.log(err);
    }else{
      response = {
        message:"File uploaded successfully",
        filename: req.files[0].originalname
      };
    }
    console.log(response);
    res.send(JSON.stringify(response));
  })
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;