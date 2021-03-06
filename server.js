const express = require('express');
const path = require('path');
const api = require('./routes/api.js');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// Homepage Get route
app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, '/public/index.html'))
  }
);

// Notes overview Get route
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// 404 page for non matched requests
app.get('/*',(req,res) => {
  res.sendFile(path.join(__dirname,'/public/404.html'))
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
