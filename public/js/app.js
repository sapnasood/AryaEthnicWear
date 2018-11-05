$(document).ready(function(){
    $('.tooltipped').tooltip();
    $('.slider').slider();
    $('.dropdown-trigger').dropdown();
    $('#modal1').modal();
    $('select').formSelect();
  });


  const selectDepartment = function(event){
    event.preventDefault();
    console.log($(this).text());
    getProds($(this).text(), '/api/category/');
   };

   const selectProductName = function(event){
    event.preventDefault();
    console.log($(this).text());
    getProds($(this).text(), '/api/category/productname/');
   };
   
   const getProds = function(category, apiurl){
   $.ajax(
   {
   method:'GET',
   url:apiurl + `${category}`
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
   $('#mainDiv').addClass('container');
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
   image.attr('width', '180px');
   image.attr('height', '280px');
   cardImg.append(image);
   
   let cardCon = $('<div>').addClass('card-content');
   
   if (parseInt(item.stock_quantity) > 0){
       quantity = 'In Stock'
   } 
   else{quantity = 'Out of Stock'};
   
   let price = $('<p>').text(`$ ${item.retail_price}` + "                  " +`${quantity}`);
   
   cardCon.append(price);
   
   let cardAction = $('<div>').addClass('card-action');
   let prodLink = $(`<a class="product waves-effect waves-light btn modal-trigger" href ="#modal1" data-id=${item.id}>`).text(item.product_name);
   cardAction.append(prodLink);
   cardDiv.append(cardImg, cardCon, cardAction);
   col.append(cardDiv);
   row.append(col);
   
   }

   $('#mainDiv').append(row);
  
   };
   


$("#mainDiv").on("click",'.product',function(event){
	event.preventDefault();
	let productId = $(this).data("id");
	console.log(productId);
	$.ajax({
	url:`/api/products/${productId}`,
	method:"GET"
	}).then(function(productresp){
        console.log(productresp)
      productPage(productresp);
	})
})

const productPage = function(productresp){
$('#modal1').modal('open');
$('#modalImg').attr('src', productresp.product_img);
$('#modalImg').attr('width', '400px');
$('#modalImg').attr('height', '350px');
$('#productName').text(productresp.product_name);
$('#add_cart').attr('data-id',productresp.id);
};


const addToCart = function(event){
event.preventDefault();
let quant = $('#quant').val();
let size = $('#size').val();
console.log(quant);
console.log(size);
$('#modal1').modal('close');
// $('#mainDiv').empty();
let productId= $(this).data("id");
console.log($(this).data("id")+'ADD');
$.ajax({
	url:`/api/products/${productId}`,
	method:"GET"
	}).then(function(productData){
        console.log(productData)
// Push the data into cart table   
 pushToCart(productData, quant, size);
	})
};

const pushToCart = function(productData, quant, size){
let productId = productData.id;
console.log(productId);
let dataSet = {
product_quant:quant,
product_size:size,
ProductId:productId
}; 

$.ajax({
    url:`/api/products/addtocart`,
    method:'POST',
    data:dataSet
}
).then(function(response){
  console.log(response);
})

};



// const checkoutPage = function(productData){
// let header = $('<h1>')
// header.text('MY SHOPPING CART');
// $('#mainDiv').append(header);
// let row = $('<div>').addClass('row center-cols center-align');
// let col1 = $('<div>').addClass('col m4');
// let col2 = $('<div>').addClass('col m4');
// // Create a table
// let table = $('<table>');
// let thead = $('<thead>');
// let tr = $('<tr>');
// let th1 = $('<th>').text('PRODUCT');
// let th2 = $('<th>').text('TITLE');
// let th3 = $('<th>').text('QUANTITY');
// let th4 = $('<th>').text('PRICE');
// let th5 = $('<th>').text('REMOVE');
// tr.append(th1, th2, th3, th4, th5);
// thead.append(tr);
// table.append(thead);
// $('#mainDiv').append(table)
// };


const getCart = function(event){
    event.preventDefault();
    
    $.ajax({
        url:`/api/getcart/`,
        method:"GET"
        }).then(function(productData){
            console.log(productData)
            $('#mainDiv').empty();
            let subtotal = 0;
            let header = $('<h2>').addClass('center');
            header.text('MY SHOPPING CART');
            $('#mainDiv').append(header);
            let row = $('<div>').addClass('row');
            let col1 = $('<div>').addClass('col m6');
// Create a table header
            let table = $('<table>').addClass('table table table-shopping-cart');
            let thead = $('<thead>');
            let tr = $('<tr>');
            let th1 = $('<th>').text('PRODUCT');
            let th2 = $('<th>').text('TITLE');
            let th3 = $('<th>').text('QUANTITY');
            let th4 = $('<th>').text('PRICE');
            let th5 = $('<th>').text('REMOVE');
            tr.append(th1, th2, th3, th4, th5);
            thead.append(tr);
            table.append(thead);
            col1.append(table);
            row.append(col1);
            
// Create table body  
let tbody = $('<tbody>');

for(let i = 0; i < productData.length; i++){
    let price = 0;
    let tr1 = $('<tr>');
    let td1 = $('<td>');
    let td2 = $('<td>');
    let td3 = $('<td>');
    let td4 = $('<td>');
    let td5 = $('<td>');
//  Logic to display product image
    let product_img = productData[i].Product.product_img;
    let prdImg = $('<img>').attr('src', product_img);
    prdImg.attr('width', '100px');
    prdImg.attr('height', '110px');
    td1.append(prdImg);
    tr1.append(td1);
// Logic to display product name   
    let product_name = productData[i].Product.product_name;
    td2.append(product_name);
    tr1.append(td2);  
// Logic to display product quantity  
let quantity =   productData[i].product_quant;

td3.append(quantity);
tr1.append(td3);  
if(productData[i].Product.product_type === 'buy'){
price = parseInt(quantity) * parseInt(productData[i].Product.retail_price);}
else
{price = parseInt(quantity) * parseInt(productData[i].Product.rental_price);}
subtotal += price;
td4.append(price);
tr1.append(td4); 
tbody.append(tr1);
};

table.append(tbody);
col1.append(table);
row.append(col1);
let col2 = $('<div>').addClass('col m6');  
let subTotal = $('<h5>').text(`SUBTOTAL: $ ${subtotal}`);
col2.append(subTotal);

let checkOutBtn = $("<a>").addClass('waves-effect waves-light btn checkout');
checkOutBtn.text('CHECKOUT')
col2.append(checkOutBtn);
row.append(col2);

$('#mainDiv').append(row);


})};
        




$('#clothing').on('click', selectDepartment);
$('#jewelry').on('click', selectDepartment);
$('#anarkalis').on('click',selectProductName);
$('#saris').on('click',selectProductName);
$('#lehengas').on('click',selectProductName);
$('#rental').on('click', selectDepartment );
$('#add_cart').on('click', addToCart);
$('#getcart').on('click',getCart);