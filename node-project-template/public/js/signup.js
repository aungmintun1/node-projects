//  eslint-disable 
export const signup = async (name,email) => {
    try {
      const res = await axios({
        method: 'POST',
        url: 'http://localhost:8000/users/postUser',
        data: {
        name,
        email
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
  
     signup(name,email);
  });
  
  