// 1. create server.mjs file
// 2. npm init -y - creates package.json
// 3. correct package.json
// 4. npm i express - download express
// 5. import express at top of page
// 6. Initialize express into a variable
// 7. Listen to express(app) at the BOTTOM of the page

import express from 'express';
import userRoutes from './routes/userRoutes.mjs';
import fs from 'fs'; //file system is build in to Node

// Initialize express into a variable
const app = express();
const PORT = 3000;

//Server static files to be used by template
app.use(express.static('./styles'));

//Creating template engine
app.engine('cat', (filePath, options, callback) => {
  fs.readFile(filePath, (err, content) => {
    //Error handling
    if (err) return callback(err);

    //Takes template, turns to string, puts dynamic content in spedified areas, returns value
    const rendered = content
      .toString()
      .replaceAll('#title#', `${options.name}`)
      .replace('#content#', `${options.content}`)
      .replace('#lorem#', options.lorem)
      .replace('#img#', `${options.img}`);

    return callback(null, rendered);
  });
});

app.set('views', './views'); // specify the views directory
app.set('view engine', 'cat'); // register the template engine

//Middleware
const logReq = function (req, res, next) {
  console.log('Request Received');
  next();
};

app.use(logReq);
app.use((err, req, res, next) => {
  res.status(400).send(err.message);
});

//Routes - order of routes is most specific --> least specific
//first arg is path - always in quotes
app.get('/', (req, res) => {
  let options = {
    name: 'My App',
    content: 'Holy Cow this is magic',
    lorem: `lorem ipsum something, another thing i wanted to get a lot of text but its not working, Toooo bad`,
    img: 'https://m.media-amazon.com/images/I/619HhG5MELL.__AC_SX300_SY300_QL70_FMwebp_.jpg',
  };

  res.render('template', options);
});

app.get('/new/:title/:content/:lorem', (req, res) => {

    //this replicates going to db
  let options = {
    title: req.params.title,
    content: req.params.content,
    lorem: req.params.lorem,
  };

  res.render('template', options);
});

app.get('*', (req, res) => {
  res.send('404 page not found');
});

app.use('/user', userRoutes);

//App.listen should ALWAYS be the last thing in your server
app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
