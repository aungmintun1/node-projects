/* eslint-disable */

export const update = async (id,size,price) => {
    try {
      const res = await axios({
        method: 'PATCH',
        url: `http://localhost:8000/shirts/updateShirt/${id}`,
        data: {
         size,
         price
        }
      });
  
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  

document.querySelector('.form').addEventListener('submit', e => {
    e.preventDefault();
      
      const id = shirtId;
      const size = document.getElementById('size').value;
      const price = document.getElementById('price').value;
    
      update(id,size,price)
  });
  


