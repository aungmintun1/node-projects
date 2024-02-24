//  eslint-disable 
import axios from 'axios';
export const login = async (email,password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:8000/users/login',
      data: {
       email,
       password
      }
    });

    if (res.data.status === 'success') {
    console.log('Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
      // if the login is successful, we alert a success popup and after 1.5 seconds we load the home page
    }
  } catch (err) {
    console.log(err.response.data.message);
  }
};


