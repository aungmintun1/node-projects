//  eslint-disable 
import '@babel/polyfill';
import {login} from './login';
import {createThread} from './createThread'
import {createComment} from './createComment'
import {createReply} from './createReply'
import {addThreadLike} from './addThreadLike'

//components and or buttons containing eventlistener
const loginForm = document.querySelector('.form');
const createThreadBtn = document.querySelector('.create-post-btn');
const createCommentBtn = document.querySelector('.submit-button');
const createReplyBtn = document.querySelectorAll('.submit-reply');
const threadLikeBtn = document.querySelector('.like-thread');

//delegation
if(loginForm)
document.querySelector('.form').addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
      login(email,password);
  });


  if(createThreadBtn)
  createThreadBtn.addEventListener('click', e => {
      e.preventDefault();
     
      const question = document.getElementById('question').value;
      const description = document.getElementById('description').value;

        createThread(question, description);
   });

   if(createCommentBtn)
   createCommentBtn.addEventListener('click', e => {
       e.preventDefault();   
    
       const comment = document.getElementById('comment').value;
       const thread= createCommentBtn.getAttribute('data-threadId');

         createComment(comment,thread);
    });


    if(createReplyBtn)
    createReplyBtn.forEach(button => {
      button.addEventListener('click', e => {
        e.preventDefault();
        
        const textareaBox = e.target.closest('.textarea-box');
        // selects textarea-box closest to the button
        const replyText = textareaBox.querySelector('.reply-input').value; 
        //now it selects the input of the reply-input that is in the same textareaBox as the button 

        const thread = button.getAttribute('data-threadId');
        const comment = button.getAttribute('data-commentId');
       
       createReply(replyText,thread,comment);
       
      });
    });

    if(threadLikeBtn)
    threadLikeBtn.addEventListener('click', e => {
        e.preventDefault();   
 
        const thread = threadLikeBtn.getAttribute('data-threadId');
 
          addThreadLike(thread);
     });