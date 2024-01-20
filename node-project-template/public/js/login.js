//  eslint-disable 
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

  } catch (err) {
    console.log(err.response.data.message);
  }
};



document.querySelector('.form').addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

    login(email,password);
});

