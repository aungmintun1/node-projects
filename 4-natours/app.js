const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json())
//middleware that is added onto the req object

const tours = JSON.parse(fs.readFileSync(`${__dirname}/starter/dev-data/data/tours-simple.json`));
//stores json data into tours variable 

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        data:{tours}
    })
});

app.post('/api/v1/tours', (req, res) => {

  const newId = tours[tours.length -1].id +1;
  //creates the number for the newID
  const newTour = Object.assign({id: newId} , req.body);
  //Makes a object that contains the id property and whatever is in the req.body object

  tours.push(newTour);
  //adds the newTour object into our tours array

  fs.writeFile(`${__dirname}/starter/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).json({
        status: 'success',
        data: {
            tour: newTour
        }
        //we then write the JSON text into the tours-simple.json file. 
        //we have the json object which is then wrapped around status and the data object
    })
  })
})


const port = 3000;
app.listen(port, () => {
    console.log('app running on port 3000')
})