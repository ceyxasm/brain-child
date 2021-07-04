const express=require('express');
const app=express();
const cors=require('cors');
const bcrypt=require('bcrypt-nodejs');
const knex = require('knex');
const register= require('./controllers/register');
const signin = require('./controllers/signin');
const profile= require('./controllers/profile');
const image= require('./controllers/image');

app.use(express.json());
app.use(cors());

const db= knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'toor',
    database : 'brainchild'
  }
});


app.get('/',(req,res)=>{ res.send(database.users);   })

app.post('/signin', (req,res) => { signin.handleSignin( req, res, db, bcrypt) })

app.post('/register', (req, res)=> { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req,res) => { profile.handleProfileGet(req, res, db) })

app.put('/image', (req,res) => { image.handleImage(req, res, db) })

app.post('/imageurl', (req,res) => { image.handleApiCall(req, res) })


app.listen(3000,()=>{ console.log("app running"); })


/*
/ --> res=this is working >> DONE
/signin--> POST= success/fail >>DONE
/register--> POST= user >>Done
/profile/:userID --> GET= user>> Done
/image--> POST=user
*/