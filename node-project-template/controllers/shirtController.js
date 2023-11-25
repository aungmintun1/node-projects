const fs = require('fs').promises;

exports.getAllShirts =  async (req,res) => {
    try{
        const data = await fs.readFile('data.json', 'utf-8');
        const shirts = JSON.parse(data);

        res.status(200).json({
            status: 'success',
            results:{shirts}
        })
    }

    catch(err){
        res.status(404).json({
            status: 'error',
            message: err
        })
    }
}