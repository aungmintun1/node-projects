//  eslint-disable 
export const signup = async (name,email,password,passwordConfirm) => {
    try {
      const res = await axios({
        method: 'POST',
        url: 'http://localhost:8000/users/postUser',
        data: {
        name,
        email,
        password,
        passwordConfirm
        }
      });
  
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  
  
  
  document.querySelector('.form').addEventListener('submit', e => {
    e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const passwordConfirm = document.getElementById('passwordConfirm').value;

  
     signup(name,email,password,passwordConfirm);
  });
  
  