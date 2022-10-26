const fs = require('fs')
const express = require('express');
const cors = require('cors');
const app = express();

let data = require('./data.json');

app.use(cors());
const port = 3000;

app.get('/', function (req, res) {
  res.json(data)
});

app.post('/add', function (req, res) {
  const newItem = req.body
  data.products.push(newItem)
  fs.writeFile("./data.json", JSON.stringify(data), function (err){
    if (err) {
      throw err;
    }
  });
  res.send("done")
})

app.delete('/', function (req, res) {
  const shop = req.body
  const products =  data.products.filter(t => t != shop);
  data.products = products;
  res.send("deleted")
  console.log(products)
  console.log(shop)
})


app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))