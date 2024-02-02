//  eslint-disable 
import '@babel/polyfill';
import {login} from './login';
import {addCart} from './addCart';
import {deleteItem} from './delete';
import {editItem} from './edit';

//components and or buttons containing eventlistener
const loginForm = document.querySelector('.form');
const buttons = document.querySelectorAll('.add_btn');
const deleteBtns = document.querySelectorAll('.delete');
const editBtns = document.querySelectorAll('.edit_btn');

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

      addCart(shirt,quantity);
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
