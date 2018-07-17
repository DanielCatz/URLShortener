// server.js

// first we import our dependencies…
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import sqlite from 'sqlite3';
//import Comment from './models/comment';

// and create our instances
const app = express();
const router = express.Router();

// set our port to either a predetermined port number if you have set it up, or 3001
const API_PORT = process.env.PORT || 3001;
const DB_PORT =  3306;
// now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));


// now we can set the route path & initialize the API
router.get('/', (req, res) => {
  res.json({ message: 'API Is Perfectly Adequate' });
  res.send({message: 'API Is Perfectly Adequate'});
});

// Connect to DB
let db = new sqlite.Database('./db/nanourl.db', (err) => {
  if(err)
  console.log('db failed',err);
  else console.log('Connected to DB');
});

// Initiallize db
db.run('CREATE TABLE IF NOT EXISTS links('
+ 'id INTEGER PRIMARY KEY AUTOINCREMENT,'
+ 'origurl TEXT,'
+ 'shorturl TEXT'
+  ')', function (err) {
    if (err) throw err;
});

//insert a long url in db, no short
router.post('/shorten', (req,res)=>{
  const { url} = req.body;
  db.run('INSERT INTO links VALUES (NULL,?,?)',[url], function(err) {
      if(!err){
        return res.json({ success: true, boop:false, insertId: this.lastID});
      }
      else
        return res.json({ success: false, error: err }); 
    })  
});


//update longurl entry with biject hash
router.put('/shorten', (req, res) => {
  const { id, urlHash  } = req.body;
  if (!id || !urlHash) {
    return res.json({ success: false, error: 'No url/hash id provided' });
  }
  else{
    db.run('UPDATE links SET shorturl = ? WHERE id = ?',[urlHash, id], (err, origurl, fields) => {
      if(!err)
        return res.json({ success: true, origurl});
      else
        return res.json({ success: false, error: err }); 
    })
  }
});

// given key, return long url
router.get('/redirect/:id', (req,res) =>{
  console.log("looking for " + req.params.id)
  db.get('SELECT origurl FROM links WHERE id = ?',[req.params.id], (err, origurl, fields) => {
    if(!err)
      return res.json({ success: true, origurl});
    else
      return res.json({ success: false, error: err }); 
  })
});


//sqlite test
router.get('/lites', (req,res) =>{
  db.all('SELECT * FROM links', (err, result) => {
    if(!err)
        return res.json({ success: true, result: result});
      else
        return res.json({ success: false, error: err }); 

  });  
});

// Use our router configuration when we call /api
app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));