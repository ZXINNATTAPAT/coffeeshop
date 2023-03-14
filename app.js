var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const secret  = 'Fullstack-login-2021'


app.use(cors())

const mysql = require('mysql2');
// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mydb'
  });
  
app.post('/register',jsonParser, function (req, res, next) {
            bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            connection.execute(
            'INSERT INTO users (Tel,password,fname,lname) VALUES (?,?,?,?)',
            [req.body.Tel, hash, req.body.fname, req.body.lname],
            function(err, results, fields) {
                if(err){
                    res.json({status : 'error',message :err})
                    return
                }
            res.json({status :'ok'})
            }
        );
    });
})

app.post('/login',jsonParser,function(req,res,next){
    connection.execute(
        'SELECT * FROM users WHERE Tel=?',
        [req.body.Tel],
        function(err, users, fields) {
            if(err) { res.json({status : 'error',message :err}); return }
            if(users.length == 0) {res.json({status:'error', message:'No user found'}); return }

            bcrypt.compare(req.body.password, users[0].password, function(err, isLogin) {
                if(isLogin){
                    var token = jwt.sign({ Tel: users[0].Tel }, secret, { expiresIn: '1h' });
                    res.json({status:'ok',message:'login success',token})
                    
                }
                else{
                    res.json({status:'error',message : 'login failed'})
                }
            });
        }
    );

})

app.post('/authen',jsonParser,function(req,res,next){
    // const token =Record<string, any>, number>
    try{
        const token =req.headers.authorization.split(' ')[1]
        var decoded = jwt.verify(token, secret);
        res.json({status:'ok',decoded})
    }catch(err){
        res.json({status:'error', message :err.message})
    }

})

app.post('/bid',jsonParser, function (req, res, next) {
    connection.execute(
    'INSERT INTO bid ( Tel, product_id, amount ) VALUES (?,?,?)',
    [req.body.Tel, req.body.product_id, req.body.amount ],
    function(err, results, fields) {
        if(err){
            res.json({status : 'error',message :err})
            return
        }
    res.json({status :'ok'})
    }
    );
    
})

app.listen(3333, function () {
  console.log('CORS-enabled web server listening on port 3333')
})