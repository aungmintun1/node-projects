//  eslint-disable 
import axios from 'axios';
export const createThread = async (question) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:8000/threads/createThread',
      data: {
       question
      }
    });

  } catch (err) {
    console.log(err.response.data.message);
  }
};


