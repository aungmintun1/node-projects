//  eslint-disable 

export const addCart = async (user,shirt) => {
    try {
      const res = await axios({
        method: 'PATCH',
        url: `http://localhost:8000/users/addCart`,
        data: {
          cart:[{shirt}]
        },
       
      });
      console.log(res)
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  
  const buttons = document.querySelectorAll('.add_btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', e => {
      e.preventDefault();

      const shirtId = button.getAttribute('data-shirt-id');
      const userId = document.querySelector('.userId').getAttribute('data-user-id');

      addCart(userId, shirtId);
    });
  });
  
  