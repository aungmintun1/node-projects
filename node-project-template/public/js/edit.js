//  eslint-disable 
import axios from 'axios';
export const editItem = async (shirt,quantity) => {
    try {
      const res = await axios({
        method: 'PATCH',
        url: `http://localhost:8000/users/edit`,
        data: {
          shirt,
          quantity
        },
       
      });
      console.log(res)
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  
 
  
  