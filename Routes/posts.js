const express = require('express');
const { model } = require('mongoose');

const router = express.Router();

router.get('/', (req,res) => {
    console.log("Post Happned.");
    res.send("Sample post.");
});

module.exports = router;