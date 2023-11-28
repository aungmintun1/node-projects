const Shirt = require('./../models/shirtModel');
exports.getAllShirts =  async (req,res) => {
    try{

       const data = await Shirt.find();

        res.status(200).json({
            status: 'success',
            results: {data},
            
        })
    }

    catch(err){
        res.status(404).json({
            status: 'error',
            message: err
        })
    }
}

exports.createShirts =  async (req,res) => {
    try{
        const newShirt = await Shirt.create(req.body);

        // Send a JSON response back to the client
        res.status(201).json({
          status: 'success',
          data: {
            shirt: newShirt
          }
        });
    }

    catch(err){
        res.status(404).json({
            status: 'error',
            message: err
        })
    }
}