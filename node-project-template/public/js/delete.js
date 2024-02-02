/* eslint-disable */

import axios from 'axios';
export const deleteItem= async (shirt) => {
    try {
      const res = await axios({
        method: 'DELETE',
        url: `http://localhost:8000/users/deleteItem`,
        data: {
          shirt
        }
      });
  
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  

