const PORT = process.env.PORT || 3000;
const express = require('express');
const mongoose = require('mongoose');
const swaggerDoc = require('./Routes/swaggerDoc.js');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

const app = express();
swaggerDoc(app);

//!MiddleWare
app.use(bodyParser.json());
app.use(cors());


//!Import ROUTES
const postRoutes = require('./Routes/posts');
const authRoutes = require('./Routes/auth');

app.use('/posts',postRoutes);
app.use('/posts/getAllProducts',postRoutes);
app.use('/posts/addNewProduct',postRoutes);
app.use('/posts/deleteProduct/:id',postRoutes);
app.use('/user',authRoutes);
app.use('/user/addUser',authRoutes);

//!Connect to DB
mongoose.connect(process.env.DB_CONNECTION,
{useNewUrlParser: true, useUnifiedTopology: true},
() => console.log(`Connected to DB.`));



//!listening 
app.listen(PORT,()=> {console.log(`Server Started With Port : ${PORT}`);});