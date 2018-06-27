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

router.post('/', function (req, res) {
    connection.query('INSERT INTO users SET ?', req.body, 
        function (err, result) {
            if (err) throw err;
            res.send('User added to database with ID: ' + result.insertId);
        }
    );
});

router.get('/shorten/:origurl', (req,res) =>{
  connection.query('SELECT * FROM links WHERE origurl = ?',[req.params.origurl], (err, shorturl, fields) => {
    if(!err)
      return res.json({ success: true, shorturl});
    else
      return res.json({ success: false, error: err }); 
  })
});

router.get('/shorten', (req,res) =>{
  connection.query('SELECT * FROM links', (err, rows, fields) => {
    if(!err)
      return res.json({somethingLikedata:rows});
    else
      console.log(err);
  })
});
/*
router.get('/comments', (req,res) =>{
  Comment.find((err, comments) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: comments });
  });
});

router.post('/comments', (req, res) => {
  const comment = new Comment();
  // body parser lets us use the req.body
  const { author, text } = req.body;
  if (!author || !text) {
    // we should throw an error. we can do this check on the front end
    return res.json({
      success: false,
      error: 'You must provide an author and comment'
    });
  }
  comment.author = author;
  comment.text = text;
  comment.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.put('/comments/:commentId', (req, res) => {
  const { commentId } = req.params;
  if (!commentId) {
    return res.json({ success: false, error: 'No comment id provided' });
  }
  Comment.findById(commentId, (error, comment) => {
    if (error) return res.json({ success: false, error });
    const { author, text } = req.body;
    if (author) comment.author = author;
    if (text) comment.text = text;
    comment.save(error => {
      if (error) return res.json({ success: false, error });
      return res.json({ success: true });
    });
  });
});

router.delete('/comments/:commentId', (req, res) => {
  const { commentId } = req.params;
  if (!commentId) {
    return res.json({ success: false, error: 'No comment id provided' });
  }
  Comment.remove({ _id: commentId }, (error, comment) => {
    if (error) return res.json({ success: false, error });
    return res.json({ success: true });
  });
});
*/

// Use our router configuration when we call /api
app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));