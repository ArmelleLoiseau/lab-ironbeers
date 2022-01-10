const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + '/views/partials');
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(data => {
      res.render('beers.hbs', {
        beers: data
      });
      // res.send(JSON.stringify(data));
      // console.log(`the beers are : ${readableData}`);
    })
    .catch(error => console.error(error));
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(beer => {
      res.render('random-beer.hbs', {
        beer
      });
    })
    .catch(e => console.error(e));
});

app.get('/beers/:id', (req, res) => {
  const id = req.params.id;
  punkAPI
    .getBeer(id)
    .then(data => {
      res.render('one-beer.hbs', {
        beer: data
      });
    })
    .catch(e => console.error(e));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
