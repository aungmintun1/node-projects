//  eslint-disable 
//import js files, use function in delegation
import '@babel/polyfill';
import {login} from './login';
import {addCart} from './addCart';
import {deleteItem} from './delete';
import {editItem} from './edit';
import {bookShirt} from './stripe';

//components and or buttons containing eventlistener
const loginForm = document.querySelector('.form');
const buttons = document.querySelectorAll('.add_btn');
const deleteBtns = document.querySelectorAll('.delete');
const editBtns = document.querySelectorAll('.edit_btn');
const filterOptions = document.querySelectorAll('.filter-dropdown-content div');
const bookBtn = document.getElementById('book-shirt');

//delegation

if(loginForm)
document.querySelector('.form').addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
      login(email,password);
  });
  
 
  if(buttons)
  buttons.forEach(button => {
    button.addEventListener('click', e => {
      e.preventDefault();

      const shirt = button.getAttribute('data-shirt-id');
      const quantity = Number(button.getAttribute('data-quantity')); 
      const size = button.getAttribute('data-size');

      addCart(shirt,quantity,size);
    });
  });

  if(deleteBtns)
  deleteBtns.forEach(button=>{
    button.addEventListener('click', e => {
      e.preventDefault();
      console.log('clicked delete');
   
       const shirt = button.getAttribute('data-shirt-id');
      deleteItem(shirt)

    })
  })

  if(editBtns)
  editBtns.forEach(button => {
    button.addEventListener('click', e => {
      e.preventDefault();

      const shirt = button.getAttribute('data-shirt-id');
      const quantity = Number(button.getAttribute('data-quantity')); 

      editItem(shirt,quantity);
    });
  });

  if(filterOptions)
  filterOptions.forEach(function(option,index){
    option.addEventListener('click', function() {
      const query = option.getAttribute('data-string');
      const sort = '?sort=' + query;
      
      window.setTimeout(() => {
        location.assign(`/${sort}`);
      }, 1000);
    });
  });

  

if (bookBtn)
  bookBtn.addEventListener('click', e => {

    bookShirt();
    // this event listener is for buying
    //in this case, we get all the data through req.user, this is from the auth.protect route
    // when clicked it redirects to the checkout page through the function in stripe.js
  });