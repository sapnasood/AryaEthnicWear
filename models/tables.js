module.exports = function(sequelize, DataTypes){
    const Products = sequelize.define('Products', {
         product_name: {
            type: DataTypes.STRING
          },
          product_img:{
           type: DataTypes.STRING
          },
         category: {
            type: DataTypes.STRING
          },
         rental_price: {
            type: DataTypes.DECIMAL(10,2)
          },
          retail_price: {
            type: DataTypes.DECIMAL(10,2)
          },
         stock_quantity:{
            type: DataTypes.INTEGER  
          }
       } 
     )
     return Products;
    };