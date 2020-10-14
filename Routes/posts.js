const express = require('express');
const router = express.Router();

const product = require('../models/Product');

router.get('/', (req,res) => {
    console.log("Post Happned.");
    let m = {
        Id : 1,
        Name : "Jesan"
    };
    res.send(m);
});

router.post('/newpost', (req,res) => {
    console.log(req.body);
    
    res.send("New post.");
});

// router.post('/addProduct',(req,res) => {

// });


module.exports = router;