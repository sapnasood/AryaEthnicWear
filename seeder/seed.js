const db = require('../models');

const items = [
    {
      product_name: "anarkalis",
      product_img: "https://blog.lashkaraa.com/wp-content/uploads/2015/12/Shraddha-Black-and-Gold-Embroidered-Anarkali-Suit.jpg",
      category: "clothing",
      rental_price: 45,
      retail_price: 330,
      stock_quantity: 10
      }, 

     { product_name: "anarkalis",
      product_img: "https://assets.panashindia.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/5/2/5205_1.jpg",
      category: "clothing",
      rental_price: 35,
      retail_price: 230,
      stock_quantity: 10
      }, 

      { product_name: "sari",
      product_img: "https://www.bollywoodshaadis.com/img-scale/670/article-20173825381720297000.jpg",
      category: "clothing",
      rental_price: 25,
      retail_price: 330,
      stock_quantity: 10
      }, 


      { product_name: "sari",
      product_img: "https://rukminim1.flixcart.com/image/612/612/sari/h/r/v/1-1-nstasselmulti1-vastrakala-original-imaehhz8vmmdgyau.jpeg?q=70",
      category: "clothing",
      rental_price: 25,
      retail_price: 330,
      stock_quantity: 10
      }, 

      { product_name: "lehengas",
      product_img: "https://blog.lashkaraa.com/wp-content/uploads/2015/12/Shraddha-Black-and-Gold-Embroidered-Anarkali-Suit.jpg",
      category: "clothing",
      rental_price: 25,
      retail_price: 330,
      stock_quantity: 10
      }, 

      { product_name: "lehengas",
      product_img: "https://blog.lashkaraa.com/wp-content/uploads/2015/12/Shraddha-Black-and-Gold-Embroidered-Anarkali-Suit.jpg",
      category: "clothing",
      rental_price: 25,
      retail_price: 330,
      stock_quantity: 10
      }, 

      { product_name: "jewellery",
      product_img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiFiW6S_tsjjig_DQtseZ64jv7po9ljUQobDyBf5xun0WNBQ_C3A",
      category: "wedding set",
      rental_price: 25,
      retail_price: 330,
      stock_quantity: 10
      }, 

      { product_name: "jewellery",
      product_img: "https://www.picclickimg.com/d/l400/pict/273026594487_/Indian-Bollywood-Fashion-Ethnic-Wedding-Bridal-Gold-Plated.jpg",
      category: "wedding set",
      rental_price: 25,
      retail_price: 330,
      stock_quantity: 10
      }, 

      { product_name: "jewellery",
      product_img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX1j6Y0YU6jJUpZ9S73mYr4FFVKm4aF4gEu0pW3R5XOzeyD1UZ",
      category: "wedding set",
      rental_price: 25,
      retail_price: 330,
      stock_quantity: 10
      }, 

      { product_name: "jewellery",
      product_img: "https://i.ebayimg.com/images/g/PwgAAOxyGxxSJcoz/s-l640.jpg",
      category: "wedding set",
      rental_price: 25,
      retail_price: 330,
      stock_quantity: 10
      }

    ]    

    db.sequelize.sync({force: true}).then(function() {
        db.Products.bulkCreate(items).then(function(rows) {
          console.log('\n\nINSERTED\n\n');
        }).catch(function(err) {
          console.log('\n\nError:', err);
        });
      });