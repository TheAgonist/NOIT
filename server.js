require('rootpath')();
var express = require('express');
var app = express();
var formidable = require('formidable');
var session = require('express-session');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');
var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
var fs = require('fs-extra');       //File System - for file manipulation

app.use(busboy());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(busboy({defer: true}));
app.use(bodyParser.json());
app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));

// use JWT auth to secure the api
app.use('/api', expressJwt({ secret: config.secret }).unless({ path: ['/api/users/authenticate', '/api/play/getCurrentRecord', '/api/users/register','/api/upload/upload'] }));

// routes
app.use('/login', require('./controllers/login.controller'));
app.use('/register', require('./controllers/register.controller'));
app.use('/app', require('./controllers/app.controller'));
app.use('/api/users', require('./controllers/api/users.controller'));
app.use('/api/play', require('./controllers/api/play.controller'));
app.use('/api/upload', require('./controllers/api/upload.controller'));

app.route('/upload')
    .post(function (req, res, next) {
        var form = new formidable.IncomingForm();
        //Formidable uploads to operating systems tmp dir by default
        form.uploadDir = "./public/img";       //set upload directory
        form.keepExtensions = true;     //keep file extension

        form.parse(req, function(err, fields, files) {
            console.log(files.type);
            res.writeHead(200, {'content-type': 'text/plain'});
            res.write('received upload:\n\n');
            console.log("form.bytesReceived");
            //TESTING
            console.log("file size: "+JSON.stringify(files.fileUploaded.size));
            console.log("file path: "+JSON.stringify(files.fileUploaded.path));
            console.log("file name: "+JSON.stringify(files.fileUploaded.name));
            console.log("file type: "+JSON.stringify(files.fileUploaded.type));
            console.log("astModifiedDate: "+JSON.stringify(files.fileUploaded.lastModifiedDate));

            //Formidable changes the name of the uploaded file
            //Rename the file to its original name
            fs.rename(files.fileUploaded.path, './public/img/'+files.fileUploaded.name, function(err) {
            if (err)
                throw err;
              console.log('renamed complete');  
            });
              res.end();
        });
    });

// make '/app' default route
app.get('/', function (req, res) {
    return res.redirect('/app');
});

// start server
var server = app.listen(3000, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});