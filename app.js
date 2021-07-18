const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 80;

const bodyparser = require("body-parser"); //To handle HTTP POST requests in Express. js version 4 and above, you need to install the middleware module called body-parser . body-parser extracts the entire body portion of an incoming request stream and exposes it on req.

// getting mongoose redy it will help us connect databse form nodejs
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/avinashtext', {useNewUrlParser: true, useUnifiedTopology: true});

// creating schema for mongoose
const contactschema = mongoose.Schema({
    name : String,
    age : String,
    gender : String,
    address : String,
    more : String

});

// creating model out of schema

const contact = mongoose.model('contact', contactschema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded());  // it helps us to read from url file that is when we post it helps us to read data

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {'title': 'Gym form', "content": con}
    res.status(200).render('index.pug', params);
})
// app.post('/',(req,res)=>{  this was to store data in a text file which i did earlier
//     let name = req.body.name;
//     age = req.body.age;
//     gender = req.body.gender;
//     address = req.body.address;
//     more = req.body.more;
//     let outputToWrite = `the name of the client is ${name}, ${age} years old, ${gender}, residing at ${address}. More about him/her: ${more}`
//     fs.writeFileSync('output.txt', outputToWrite)
//     const params = {'message': 'Your form has been submitted successfully'}
//     res.status(200).render('index.pug', params);
// })

// this will handle post request and save the data in the data base

app.post('/', (req,res)=>{
    var mydata = new contact(req.body)
    mydata.save().then(()=>{
        res.status(200).render('index.pug');
        console.log("your data has been stored")
    }).catch(()=>{
        res.status(400).render('index.pug');
        console.log("your data was not stored")
    })
});

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
