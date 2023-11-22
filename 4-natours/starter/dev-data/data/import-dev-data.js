const fs = reqiure('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const Tour = require('./../../models/tourModel');

const DB = process.env.DATABASE.replace('<PASSWORD>' , process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {console.log('DB connection successful')
})

const tours = JSON.parse(fs.readFileSync('tours-simple.json', 'utf-8'));

const importData = async ()=>{
    try{
        await Tour.create(tours);
        console.log('data successfully loaded')
    }
    catch(err){
        console.log(err)
    }
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
    try {
    await Tour.create(tours)
    console.log('Data successfully deleted!')
    } catch (err) {
    console.log(err);
    }
    }