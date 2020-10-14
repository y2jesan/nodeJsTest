const PORT = process.env.PORT || 3000;
const express = require('express');
const mongoose = require('mongoose');
const swaggerDoc = require('./swaggerDoc.js');
require('dotenv/config');

const bodyParser = require('body-parser');

const app = express();
swaggerDoc(app);

//!Import ROUTES
const postRoutes = require('./Routes/posts');

//!MiddleWare
app.use(bodyParser.json());

app.use('/posts',postRoutes);
app.use('/posts/getAllProducts',postRoutes);
app.use('/posts/addNewProduct',postRoutes);

//!Connect to DB
mongoose.connect(process.env.DB_CONNECTION,
{useNewUrlParser: true, useUnifiedTopology: true},
() => console.log("Connected to DB."));



//!listening 
app.listen(PORT,()=> {console.log("Server Started With Port : "+ PORT);});