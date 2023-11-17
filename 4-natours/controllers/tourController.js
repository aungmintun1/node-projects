const fs = require('fs');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../starter/dev-data/data/tours-simple.json`));
//stores json data into tours variable 


exports.checkID = (req, res, next, val) => {
    console.log(`checkID is running. Tour id is: ${val}`); 
    if (req.params.id * 1 > tours.length) {
    return res.status (404).json ({
    status: 'fail',
    message: 'Invalid ID'
    });
    }
    next();
};

exports.checkBody = (req, res, next,) => {
    if(!req.body.name || !req.body.price){
        return res.status(400).json({
            status: 'fail',
            message:'Missing name or price'
        })
    }
    next();
}

exports.getAllTours = (req, res) => {
    res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
    tours
    }
   });
  }; 

exports.getTour =  (req, res) => {
    console.log(req.params);

    const id = req.params.id *1;    
    const tour = tours.find(el => el.id === id);

    res.status(200).json({
        status: 'success',
        data:{tour}
    })
}

exports.createTour =  (req, res) => {

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
  }

  exports.updateTour =  (req, res) => {

    res.status (200).json({

    status: 'success',
    data: {
    tour: '<Updated tour here...>'
    }

    });
    }

    exports.deleteTour =  (req, res) => {
    
        res.status(204).json({
            
        status: 'success',
        data:null
    
        });
        }
