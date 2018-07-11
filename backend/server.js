// server.js

// first we import our dependencies…
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mysql from 'mysql';
//import Comment from './models/comment';

// and create our instances
const app = express();
const router = express.Router();

// set our port to either a predetermined port number if you have set it up, or 3001
const API_PORT = process.env.API_PORT || 3001;
const DB_PORT = process.env.API_PORT || 3306;
// now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

if(DB_PORT === 3306){
    var connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'DanielCatz',
        password: 'Ouroborosu1',
        insecureAuth: true
    });
} else {

   //live server
}

connection.connect();



connection.query('CREATE DATABASE IF NOT EXISTS test', function (err) {
    if (err) throw err;
    connection.query('USE test', function (err) {
        if (err) throw err;
          connection.query('CREATE TABLE IF NOT EXISTS links('
          + 'id INT NOT NULL AUTO_INCREMENT,'
          + 'PRIMARY KEY(id),'
          + 'origurl VARCHAR(300),'
          + 'shorturl VARCHAR(300)'
          +  ')', function (err) {
              if (err) throw err;
          });
    });
});

// now we can set the route path & initialize the API
router.get('/', (req, res) => {
  res.json({ message: 'API Is Perfectly Adequate' });
  res.send({message: 'API Is Perfectly Adequate'});
});


//retrieve short
router.get('/shorten/:origurl(*)', (req,res) =>{//given long url find its short version in db
  connection.query('SELECT * FROM links WHERE origurl = ?',[req.params.origurl], (err, shorturl, fields) => {
    console.log(req.params.origurl);
    if(!err)
    return res.json({ success: true, shorturl});
    else
    return res.json({ success: false, error: err }); 
  })
});

//given short url find its long version in db
router.get('/orig/:id', (req,res) =>{
  connection.query('SELECT origurl FROM links WHERE id = ?',[req.params.id], (err, origurl, fields) => {
    if(!err)
      return res.json({ success: true, origurl});
    else
      return res.json({ success: false, error: err }); 
  })
});

//insert base entry for long into table
router.post('/shorten/:origurl(*)', (req,res) =>{//
  connection.query('INSERT INTO links VALUES (NULL,?,NULL)',[req.params.origurl], (err, origurl, fields) => {
    if(!err)
      return res.json({ success: true, origurl});
    else
      return res.json({ success: false, error: err }); 
  })
});



//update longurl entry with hash
router.put('/shorten', (req, res) => {
  const { id, urlHash  } = req.body;
  if (!id || !urlHash) {
    return res.json({ success: false, error: 'No url id provided' });
  }
  else{
    connection.query('UPDATE links SET shorturl = ? WHERE id = ?',[urlHash, id], (err, origurl, fields) => {
      if(!err)
        return res.json({ success: true, origurl});
      else
        return res.json({ success: false, error: err }); 
    })
  }
});

//test
router.get('/shorten', (req,res) =>{
  connection.query('SELECT * FROM links', (err, rows, fields) => {
    if(!err)
      return res.json({somethingLikedata:rows});
    else
      console.log(err);
  })
});

// Use our router configuration when we call /api
app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));