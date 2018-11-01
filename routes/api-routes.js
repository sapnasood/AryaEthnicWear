const express = require("express");
const path = require("path");

//Import in our db models
const db = require('../models');

const router = express.Router();


// GET Request
// Responds with products for the requested category
router.get('/api/products/:category', function(req, res){
db.Products.findAll({where : {category: req.params.category}})
.then(function(data){
    res.json(data);
}).catch(function(error){
    res.json({ error: error });
})
});

module.exports = router;