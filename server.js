// import axios from "axios";
// import fs from "fs";
// import express from "express";

// const app = express();

// app.post("/", (req, res)=> {
//     fs.readFile("./data.json", (err, data) => {
//         if (err) return err;
//         res.json(JSON.parse(data));
//     });
// });

// app.listen(3000, (err) => {
//     if(err) return err;
//     console.log(`Your data is here`);
// });

// import express from "express";
// import axios from "axios";
// import cors from "cors";



const fs = require('fs')
const express = require('express');
let data = require('./data.json');
// const bodyParser = require("body-parser");
// const axios = require('axios')

const cors = require('cors');

const app = express();
app.use(cors());
// app.use(bodyParser.json());
const port = 3000;

app.get('/', function (req, res) {
  // res.header("Content-Type",'application/json'),
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