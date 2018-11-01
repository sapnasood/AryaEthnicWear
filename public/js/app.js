$(document).ready(function(){
    $('.tooltipped').tooltip();
    $('.slider').slider();
    $('.dropdown-trigger').dropdown();
  });


  const selectDepartment = function(event){
    event.preventDefault();
    console.log($(this).text());
    getProds($(this).text());
   };
   
   const getProds = function(category){
   $.ajax(
   {
   method:'GET',
   url:`/api/products/${category}`
   }
   
   ).then(function(response){
      if(response){
       console.log(response);
       loadProducts(response);
      };
      
   });
   };
   
   const loadProducts = function(response){
//    $('#footerSec').empty();
   $('#mainDiv').empty();
   
//    let cardCont = $('<div>').addClass('container');
   let row = $('<div>').addClass('row center-cols center-align');
   
   for(let i = 0; i < response.length; i++){
      let item = response[i];
      let quantity = 0;
   // let cardCont = $('<div>').addClass('container');
   let col = $('<div>').addClass('col m4');
   let cardDiv = $('<div>').addClass('card');
   let cardImg = $('<div>').addClass('card-image');
   let image = $('<img>').attr('src',item.product_img);
   image.attr('width', '220px');
   image.attr('height', '280px');
   cardImg.append(image);
   
   let cardCon = $('<div>').addClass('card-content');
   
   if (parseInt(item.stock_quantity) > 0){
       quantity = 'In Stock'
   } 
   else{quantity = 'Out of Stock'};
   
   let price = $('<p>').text(`$ ${item.price}` + "                  " +`${quantity}`);
   
   cardCon.append(price);
   
   let cardAction = $('<div>').addClass('card-action');
   let prodLink = $('<a>').text(item.product_name);
   cardAction.append(prodLink);
   cardDiv.append(cardImg, cardCon, cardAction);
   col.append(cardDiv);
   row.append(col);
   
   }
   
//    cardCont.append(row);
   $('#mainDiv').append(row);
   
   
   
   };
   

$('#clothing').on('click', selectDepartment);
$('#jewelry').on('click', selectDepartment);
// $('#makeup').on('click', selectDepartment);
// $('#handbags').on('click', selectDepartment);   