const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = 8000;
const app = express();

const User = require('./models/User');

// Nos conecta a um DB mongoDB chamado userData
// useNewUrlParser, useUnifiedTopology, useCreateIndex é só pra acertar dependecias
mongoose.connect(
  'mongodb://localhost/userData1', 
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);

mongoose.set('useFindAndModify', false);

app.use(bodyParser.json());

app.listen(port, () =>{
	console.log(`server is listening on port:${port}`)
})

function sendResponse(res, err, data){
  if(err){
    res.json({
      success: false,
      message: err
    });
  }else if(!data){
    res.json({
      success: false,
      message: "Not Found"
    });
  }else{
    res.json({
      success: true,
      data: data
    });
  }
}

// CREATE
app.post('/users',(req,res) =>{
  User.create(
    {...req.body.newData},
    (err, data) => { sendResponse(res, err, data) });
})

app.route('/users/:id')
// READ
.get((req,res) =>{
  User.findById(
    req.params.id, 
    (err, data) => { sendResponse(res, err, data) });
})
// UPDATE
.put((req,res) =>{
  User.findByIdAndUpdate(req.params.id, 
    {...req.body.newData},
    {
      new: true
    },
    (err, data) => { sendResponse(res, err, data) });
})
// DELETE
.delete((req,res) =>{
  User.findByIdAndDelete(
    req.params.id,
    (err, data) => { sendResponse(res, err, data) });
})