var express = require('express')
var cors = require('cors')
var app = express()

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()


const bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(bodyParser.json());

var jwt = require('jsonwebtoken');
const secret  = 'Fullstack-login-2021'

const session = require('express-session');
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

app.use(cors())

const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mydb'
  });

const secretKey = 'yourSecretKey';

// const checkToken = (req, res, next) => {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (token) {
//       jwt.verify(token, secretKey, (err, decoded) => {
//         if (err) {
//           return res.status(401).json({ message: 'Invalid token' });
//         } else {
//           req.decoded = decoded;
//           next();
//         }
//       });
//     } else {
//       return res.status(401).json({ message: 'Token missing' });
//     }
//   };
  
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
app.post('/register/employee',jsonParser, function (req, res, next) {
            bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            connection.execute(
            'INSERT INTO employee (usersname, password, fname, lname, tag) VALUES (? ,? ,? ,? ,? )',
            [req.body.usersname, hash , req.body.fname, req.body.lname, req.body.tag],
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

app.post('/login', jsonParser, function(req, res, next) {
  connection.execute(
    'SELECT * FROM users WHERE Tel=?',
    [req.body.Tel],
    function(err, users, fields) {
      if (err) { 
        res.json({ status: 'error', message: err }); 
        return; 
      }

      if (users.length == 0) {
        res.json({ status: 'error', message: 'No user found' }); 
        return; 
      }

      bcrypt.compare(req.body.password, users[0].password, function(err, isLogin) {
        if (isLogin) {
          // Store user information in session
          req.session.user = {
            Tel: users[0].Tel
          };
          
          var token = jwt.sign({ Tel: users[0].Tel }, secret, { expiresIn: '1h' });
          
          res.json({ status: 'ok', message: 'login success', token });
        } else {
          res.json({ status: 'error', message: 'login failed' });
        }
      });
    }
  );
});

function authenticate(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: 'Failed to authenticate token' });
      return;
    }

    req.user = decoded;
    next();
  });
}

app.get('/protected', authenticate, (req, res) => {
  res.json({ message: 'This is a protected route' });
});


  app.get('/token', function(req, res, next) {
    var token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.json({ status: 'error', message: 'Failed to authenticate token.' });
        return;
      }
      // Token is valid, return it to the client
      res.json({ status: 'ok', token });
    });
  });
  

  // GET request handler for /authen/get


  // app.post('/authen/get',checkToken, (req, res) => {
  //   // Verify token
  //   const authHeader = req.headers.authorization;
  //   if (!authHeader) {
  //     return res.status(401).json({ message: 'Authorization header missing' });
  //   }
  //   const token = authHeader.split(' ')[1];
  //   jwt.verify(token, secret, (err, decoded) => {
  //     if (err) {
  //       return res.status(401).json({ message: 'Invalid token' });
  //     }
  //     // Token is valid, send back response
  //     res.json({ message: 'Data fetched successfully' });
  //   });
  // });
  
  
  // POST request handler for /login
  
  app.post('/api/login', jsonParser, function(req, res, next) {
    // Look up user by Tel number
    connection.execute(
      'SELECT * FROM users WHERE Tel=?',
      [req.body.Tel],
      function(err, users, fields) {
        if (err) { 
          res.json({ status: 'error', message: err }); 
          return; 
        }
  
        if (users.length == 0) {
          res.json({ status: 'error', message: 'No user found' }); 
          return; 
        }
  
        // Compare password
        bcrypt.compare(req.body.password, users[0].password, function(err, isLogin) {
          if (isLogin) {
            // Store user information in session
            req.session.user = {
              Tel: users[0].Tel
            };
  
            // Generate and sign token
            var token = jwt.sign({ Tel: users[0].Tel }, secret, { expiresIn: '1h' });
  
            res.json({ status: 'ok', message: 'login success', token });
          } else {
            res.json({ status: 'error', message: 'login failed' });
          }
        });
      }
    );
  });
  

// ############################ login Admin ##############################
app.post('/login/admin', jsonParser, function(req, res, next) {
    connection.execute(
        'SELECT * FROM employee WHERE usersname=?',
        [req.body.usersname],
        function(err, users, fields) {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }

            if (users.length == 0) {
                res.json({ status: 'error', message: 'No user found' });
                return;
            }

            bcrypt.compare(req.body.password, users[0].password, function(err, isLogin) {
                if (isLogin) {
                    var token = jwt.sign({ usersname: users[0].usersname }, secret, { expiresIn: '1h' });
                    res.json({ status: 'ok', message: 'login success', token });
                } else {
                    res.json({ status: 'error', message: 'login failed' });
                }
            });
        }
    );
});


app.post('/pulldatatel',jsonParser,function(req,res,next){
    connection.execute(
        'SELECT * FROM users WHERE Tel=?',
        [req.body.Tel],
        function(err, users, fields) {
        
            if(err) { res.json({status : 'error',message :err}); return }

            if(users.length == 0) {res.json({status:'error', message:'No user found',users}); return }

            else{ 
                const usersdata = {
                Tel: users[0].Tel,
                fname:users[0].fname,
                lname:users[0].lname,
                point:users[0].point
            };
                    res.json({status:'ok',message:'Tel passing ',usersdata})
                }
            });
        }
    );

app.post('/pulldatatel',jsonParser,function(req,res,next){
    connection.execute(
        'SELECT * FROM users WHERE Tel=?',
        [req.body.Tel],
        function(err, users, fields) {
        
            if(err) { res.json({status : 'error',message :err}); return }

            if(users.length == 0) {res.json({status:'error', message:'No user found',users}); return }

            else{ 
                const usersdata = {
                Tel: users[0].Tel,
                fname:users[0].fname,
                lname:users[0].lname,
                point:users[0].point
            };
                    res.json({status:'ok',message:'Tel passing ',usersdata})
                }
            });
        }
    );

app.post('/pulldatatel/point', jsonParser, function(req, res, next) {
        connection.execute(
          'UPDATE users SET point = point + 10 WHERE Tel = ?',
          [req.body.Tel],
          function(err, users, fields) {
            if (err) {
              res.json({ status: 'error', message: err });
              return;
            }
      
            if (users.affectedRows == 0) {
              res.json({ status: 'error', message: 'No user found', users });
              return;
            } else {
              res.json({ status: 'ok', message: 'Tel passing', users });
            }
          }
        );
      });
      
    app.post('/pulldatatel/usepoint', jsonParser, function(req, res, next) {
        connection.execute(
          'UPDATE users SET point = point - 100 WHERE Tel = ?',
          [req.body.Tel],
          function(err, users, fields) {
            if (err) {
              res.json({ status: 'error', message: err });
              return;
            }
      
            if (users.affectedRows == 0) {
              res.json({ status: 'error', message: 'No user found', users });
              return;
            } else {
              res.json({ status: 'ok', message: 'Tel passing', users });
            }
          }
        );
      });
      


// app.post('/pulldatatel', jsonParser, function(req, res, next) {
//   connection.execute(
//     'SELECT Tel, password, fname, lname FROM users WHERE Tel=?',
//     [req.body.Tel],
//     function(err, users, fields) {
//       if (err) {
//         res.json({status: 'error', message: err});
//         return;
//       }
//       if (users.length == 0) {
//         res.json({status: 'error', message: 'No user found'});
//         return;
//       }
//       const userData = {
//         Tel: users[0].Tel,
//         password: users[0].password,
//         fname: users[0].fname,
//         lname: users[0].lname
//       };
//       res.json({status: 'ok', message: 'User data found', data: userData});
//     }
//   );
// });

  

app.post('/checkphonenumber', (req, res) => {
    const { Tel }  = req.body;
  
    if (!Tel) {
      return res.status(400).json({ error: 'Missing phone number' });
    }
  
    pool.getConnection()
      .then((conn) => {
        conn.query('SELECT * FROM users WHERE Tel = ?',[Tel])
          .then(([rows]) => {
            if (rows.length > 0) {
              const { users_id, point } = rows[0];
              conn.query('UPDATE users SET point = ? WHERE users_id = ?', [point + 10, users_id])
                .then(() => res.json({ success: true }))
                .catch((err) => {
                  console.error('Error updating user data: ', err);
                  res.status(500).json({ error: 'Error updating user data' });
                });
            } else {
              res.json({ success: false });
            }
          })
          .catch((err) => {
            console.error('Error fetching data: ', err);
            res.status(500).json({ error: 'Error fetching data' });
          })
          .finally(() => conn.release());
      })
      .catch((err) => {
        console.error('Error connecting to database: ', err);
        res.status(500).json({ error: 'Error connecting to database' });
      });
  });
  
  

app.get('/login/db',jsonParser, function (req, res, next) {
    connection.query(
        'SELECT * FROM users   ',
    function(err, results,  fields) {
        
        if(err){
            res.json({status : 'error',message :err}); return}

        res.json({results})
    }
    );
})

app.get('/login/datatel/get',jsonParser,function(req,res,next){
    connection.query(
        'SELECT Tel FROM userslogin  ',
       
        function(err, results,  fields) {
        
            if(err){
                res.json({status : 'error',message :err}); return}
    
            res.json({results})
        }
        );
        }
    );


app.post('/login/datatel',jsonParser,function(req,res,next){
    connection.execute(
        'INSERT INTO userslogin (Tel) VALUES (?)',
        [req.body.Tel],
        function(err, users, fields) {
            if(err){
                res.json({status : 'error',message :err})
                return
            }
            res.json({status :'ok'})
            
            });
        }
    );

app.delete('/login/datatel/delete',jsonParser,function(req,res,next){
    connection.execute(
        'DELETE FROM userslogin',
        function(err, results, fields) {
            if (err) {
              res.json({ status: 'error', message: err });
              return;
            }
            res.json({ status: 'success', message: `All items have been removed from the userslogin.` });
          }
        );
        }
    );

app.delete('/usersdelete',jsonParser,function(req,res,next){
    connection.execute(
        'DELETE FROM users WHERE Tel = ?',
        [req.body.Tel],
        function(err, results, fields) {
            if (err) {
              res.json({ status: 'error', message: err });
              return;
            }
            res.json({ status: 'ok', message: `delete users success` });
          }
        );
        }
    );

    app.post('/usersedit', (req, res) => {
      const { Tel, fname, lname } = req.body;
      const query = `UPDATE users SET fname = ?, lname = ? WHERE Tel = ?`;
      connection.query(query, [fname, lname, Tel], (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).send('Error updating user');
        } else {
          console.log(results);
          res.status(200).json({ status: 'ok' });
        }
      });
    });

//############################# check token ##################
app.post('/authen',jsonParser,function(req,res,next){
    // const token =Record<string, any>, number>
    try{
        const token = req.headers.authorization.split(' ')[1]
        var decoded = jwt.verify(token, secret);
        res.json({status:'ok',decoded})
    }catch(err){
        res.json({status:'error', message :err.message})
    }
})


app.post('/authen/db',jsonParser,function(req,res,next){
    // const token =Record<string, any>, number>
    try{
        const token =req.headers.authorization.split(' ')[1]
        var decoded = jwt.verify(token, secret);
        res.json({status:'ok',decoded})
    }catch(err){
        res.json({status:'error', message :err.message})
    }
})

// app.get('/authen/get',jsonParser,function(req,res,next){
//     // const token =Record<string, any>, number>
//     try{
//         const token =req.headers.authorization.split(' ')[1]
//         var decoded = jwt.verify(token, secret);
//         res.json({status:'ok',decoded})
//     }catch(err){
//         res.json({status:'error', message :err.message})
//     }
// })

//######################## check token #####################
// app.put('/authen',jsonParser,function(req,res,next){
//     // const token =Record<string, any>, number>
//     try{
//         const token =req.headers.authorization.split(' ')[1]
//         var decoded = jwt.verify(token, secret);
//         res.json({status:'ok',decoded})
//     }catch(err){
//         res.json({status:'error', message :err.message})
//     }
// })


//###################### add data order ###################################


app.post('/bidlist',jsonParser, function (req, res, next) {
    connection.execute(
    'INSERT INTO bid (  product_id,  Type, price, amount,  sweets) VALUES ( ?,   ?, ?,  ?, ? )',
    [req.body.product_id, 
        req.body.Type, 
        req.body.price, 
        req.body.amount, 
        req.body.sweets
        ],

    function(err, results, fields) {
        if(err){
            res.json({status : 'error',message :err})
            return
        }
    res.json({status :'ok'})
    }
    );
    
})
// ############### pull data bidlist ###########################
app.get('/bidlist/get', function (req, res, next) {
    connection.query(
        'SELECT  product_id, Type, price, amount, sweets FROM bid ',
        function(err, results, fields) {
            if (err) {
                res.json({status: 'error', message: err});
                return;
            }
            res.json({status: 'ok', data: results});
        }
    );
});


//###################### add data order shop ###################################
app.post('/bidlist/shop', jsonParser, async function (req, res) {
    try {
      const values = [
        req.body.product_id || null,
        req.body.Type || null,
        req.body.price || null,
        req.body.amount || null,
        req.body.sweets || null,
      ];
      await connection.execute(
        'INSERT INTO bidshop (product_id, Type, price, amount, sweets) VALUES (?, ?, ?, ?, ?)',
        values
      );
      res.json({ status: 'ok' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', message: error.message });
    }
  });
  
  
//######################## view data order ##########################
app.get('/bidlist/shops',jsonParser, function (req, res, next) {
    connection.query(
        'SELECT * FROM bidshop   ',
    function(err, results,  fields) {
        
        if(err){
            res.json({status : 'error',message :err}); return}

        res.json({results})
    }
    );
})
//######################## view data order ##########################
app.get('/bidlist/cart',jsonParser, function (req, res, next) {
    connection.query(
        'SELECT * FROM bid   ',
    function(err, results,  fields) {
        
        if(err){
            res.json({status : 'error',message :err}); return}

        res.json({results})
    }
    );
})

app.delete('/bidlist/cart/delete',jsonParser, function (req, res, next) {
    connection.execute(
        'DELETE FROM bid WHERE bid_id = ?',
        [req.body.bid_id],
    function(err, results,  fields) {
        
        if(err){
            res.json({status : 'error',message :err}); return}

        res.json({ status: 'success', message: `All items asdsad.` })
    }
    );
})


//######################## delete data order ##########################
app.delete('/bidlist/cartdelete',jsonParser, function (req, res, next) {
    connection.query(
        'DELETE FROM bid',
        function(err, results, fields) {
          if (err) {
            res.json({ status: 'error', message: err });
            return;
          }
          res.json({ status: 'success', message: `All items have been removed from the cart.` });
        }
      );
    });


// app.post('/bid',jsonParser, function (req, res, next) {
//     connection.execute(
//     'INSERT INTO bid ( Tel, id_receipt, product_id, price  , amount, sweets ) VALUES (?,?,?,?,?,?)',
//     [req.body.Tel,req.body.id_receipt ,req.body.product_id, req.body.price, req.body.amount , req.body.sweets],
//     function(err, results, fields) {
//         if(err){
//             res.json({status : 'error',message :err})
//             return
//         }
//     res.json({status :'ok'})
//     }
//     );
    
// })

//add data manu 


app.post('/menu',jsonParser, function (req, res, next) {
    connection.execute(
    'INSERT INTO manu ( name_manu, product_id  , price , npng ) VALUES (?, ?, ? , ?)',
    [req.body.name_manu , req.body. product_id , req.body.price , req.body.npng ],
    function(err, results, fields) {
        if(err){
            res.json({status : 'error',message :err})
            return
        }
    res.json({status :'ok'})
    }
    );
    
})


app.post('/menu/delete', function (req, res, next) {
  connection.execute(
    'DELETE FROM manu WHERE product_id = ?',
    [req.body.product_id],
    function (err, results, fields) {
      if (err) {
        res.json({ status: 'error', message: err });
        return;
      }
      res.json({ status: 'ok' });
    }
  );
});


//pick manu by use productId
app.post('/manu:pick',jsonParser, function (req, res, next) {
    connection.execute(
        'SELECT * FROM manu WHERE product_id=?',
    [req.body. product_id],
    function(err, results, fields) {
        if(err){
            res.json({status : 'error',message :err})
            return
        }
    res.json({
        status :'ok',
        results})
    }
    );
    
})
// 
//WHERE product_id= ?
//use get for .map in webapp 
app.get('/manu/pick',jsonParser, function (req, res, next) {
    connection.query(
        'SELECT * FROM manu  ',
    function(err, results,  fields) {
        
        if(err){
            res.json({status : 'error',message :err}); return}

        res.json({results})
    }
    );
    
})



app.post('/payments/:orderId', (req, res) => {
    const orderId = req.params.orderId;
    const paymentInfo = JSON.parse(decodeURIComponent(req.body.paymentInfo));
    const qrCodeData = req.body.qrCodeData;
  
    // Verify that the payment amount and order ID match the expected values
    if (paymentInfo.amount !== 10.00 || paymentInfo.orderId !== orderId) {
      res.sendStatus(400); // Bad request
    } else {
      // Payment is valid, insert payment info and QR code data into MySQL database
      const query = 'INSERT INTO payment (order_id, amount, qr_code_data) VALUES (?, ?, ?)';
      connection.query(query, [orderId, paymentInfo.amount, qrCodeData], (error, results) => {
        if (error) {
          console.error(error);
          res.sendStatus(500); // Internal server error
        } else {
          // Payment info and QR code data were successfully inserted into database
          markOrderAsPaid(orderId);
          res.sendStatus(200); // OK
        }
      });
    }
  });
  
app.get('/stock/get',jsonParser, function (req, res, next) {
    connection.query(
        'SELECT * FROM stock  ',
    function(err, results,  fields) {
        
        if(err){
            res.json({status : 'error',message :err}); return}

        res.json({results})
    }
    );
    
})

app.post('/stock/post',jsonParser, function (req, res, next) {
    connection.execute(
        'INSERT INTO stock ( product_name , quantity  , note ) VALUES (?, ?, ? )',
        [req.body.product_name , req.body.quantity , req.body.note ],
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