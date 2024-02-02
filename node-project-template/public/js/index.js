//  eslint-disable 
import '@babel/polyfill';
import {login} from './login';
import {addCart} from './addCart';

const loginForm = document.querySelector('.form');
const buttons = document.querySelectorAll('.add_btn');

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