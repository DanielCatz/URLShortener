// server.js
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import sqlite from 'sqlite3';
import path from 'path';
import dotenv from 'dotenv';

const app = express();
const router = express.Router();
const result = dotenv.config()

// configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

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

app.use('/api', router);
var API_PORT = 3001;
if(process.env.NODE_ENV=="production"|| 1){
  API_PORT = 3000;
  app.use( express.static(path.resolve(__dirname, '../client/build') ) );
  app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });

}

// Use our router configuration when we call /api
//http://nephewapps.com/2018/05/10/handling-dev-vs-production-api-calls-using-create-react-app/
//tests using JEST

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));