const express = require('express');
const app = express();
const bcrypt = require('bcrypt')


app.use(express.json()) 



const users = []

app.get('/users', (req, res) => {
  res.json(users)
});




app.listen(3000)