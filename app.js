const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { render } = require('ejs');
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/auth');
const port = process.env.PORT || 3000;


//express app
const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://admin:FKgVs4K0UqY0LYxP@gossipy.geots.mongodb.net/gossipy?retryWrites=true&w=majority';
//'mongodb+srv://keenlearner:mongodb321@gossipy.geots.mongodb.net/gossipy?retryWrites=true&w=majority';

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        app.listen(port)
        console.info("Database Connected!")
    })
    .catch((err) => console.log(err));

// register view engine 
app.set('view engine', 'ejs');

// middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.json());

// routes
// app.get('/', (req, res)=>{
//     res.render('login', {title: 'Login'});
// });

// app.get('/api/register', (req, res)=>{
//     res.render('register', {title: 'Register'});
// });

app.get('/', (req, res)=>{
    res.render('home', {title: 'Home'});
});

app.get('/home', (req, res)=>{
    res.render('home', {title: 'Home'});
});

app.get('/about', (req, res)=>{
    res.render('about', {title: 'About'});
});

//blog routes
app.use('/blogs',blogRoutes);
app.use('/api',authRoutes);
app.use((req,res)=>{
    res.status(404).render('404', {title: '404 Error'});
});