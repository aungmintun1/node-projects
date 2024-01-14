/* eslint-disable */

export const deleteShirt = async (id) => {
    try {
      const res = await axios({
        method: 'DELETE',
        url: `http://localhost:8000/shirts/deleteShirt/${id}`,
        data: {
        }
      });
  
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  
  document.querySelector('.delete').addEventListener('click', e => {
    e.preventDefault();
      
      const id = shirtId;
      deleteShirt(id)
    
  });
  
