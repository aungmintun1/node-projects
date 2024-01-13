//  eslint-disable 
export const insert = async (size,price) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:8000/shirts/postShirt',
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
    const size = document.getElementById('size').value;
    const price = document.getElementById('price').value;

    insert(size,price);
});

