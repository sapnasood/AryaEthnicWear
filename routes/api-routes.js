const express = require("express");
const path = require("path");

//Import in our db models
const db = require('../models');

const router = express.Router();


// GET Request
// Responds with products for the requested category
router.get('/api/category/:category', function(req, res){
db.Products.findAll({where : {category: req.params.category}})
.then(function(data){
    res.json(data);
}).catch(function(error){
    res.json({ error: error });
})
});

router.get('/api/products/:productId', function(req, res){
    db.Products.findOne({where:{id:req.params.productId}})
    .then(function(data){
        res.json(data);
    }).catch(function(error){
        res.json({ error: error });
    })
    });

// Responds with products for the requested product name under specific category
router.get('/api/category/productname/:productname', function(req, res){
    db.Products.findAll({where : {product_name: req.params.productname}})
    .then(function(data){
        res.json(data);
    }).catch(function(error){
        res.json({ error: error });
    })
    });  
    
router.post('/api/products/addtocart',function(req, res){
    db.Cart_data.create(req.body).then(function(){
        res.json({success: true});
      }).catch(function(error){
        res.json({error: error});
      })


})    

router.get('/api/getcart/', function(req, res){
   db.Cart_data.findAll({include:[{model:db.Products}]}).then(function(cart){
    res.json(cart);
  }).catch(function(error){
    res.json({error: error});
  })


})

// router.get('/api/products/rental', function(req, res){
//  db.Products.findAll({where : {product_type: 'rental'}}).then(function(rental){
//     res.json(rental);
//   }).catch(function(error){
//     res.json({error: error});
// })   
// });



module.exports = router;