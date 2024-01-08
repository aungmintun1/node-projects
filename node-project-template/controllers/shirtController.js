const Shirt = require('./../models/shirtModel');

exports.getAllShirt =  async (req,res) => {
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

exports.createShirt =  async (req,res) => {
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

exports.deleteShirt = async (req, res) => {
    
    try
    {const doc = await Shirt.findByIdAndDelete(req.params.id);

    if (!doc) {
      console.log("cannot find shirt with ID")
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
}
catch(err)
{
    res.status(404).json({
        status: 'fail',
        message: err
      });

}

  };

  
  exports.updateShirt = async (req, res) => {
    try{
    const doc = await Shirt.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
}

catch(err)
{
    res.status(404).json({
        status: 'fail',
        message: err
      });

}
  };
  