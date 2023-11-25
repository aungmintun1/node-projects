const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' }); 
const app = require('./app');

const port=8000;
app.listen(port, () => {
    console.log('running on port')
    console.log(port)
   
})