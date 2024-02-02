//  eslint-disable 

import axios from 'axios';
export const addCart = async (shirt,quantity) => {
    try {
      const res = await axios({
        method: 'PATCH',
        url: `http://localhost:8000/users/addCart`,
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
  
 
  
  