const PORT = process.env.PORT || 3000;
const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');

const app = express();

//!Import ROUTES
const postRoutes = require('./Routes/posts');

app.use('/post',postRoutes);


//!Connect to DB
mongoose.connect(process.env.DB_CONNECTION,
{useUnifiedTopology : true},
() => console.log("Connected to DB."));



//!listening 
app.listen(PORT,()=> {console.log("Server Started With Port : "+ PORT);});