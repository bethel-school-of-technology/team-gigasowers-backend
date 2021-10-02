const User = require('../models/user');

const farmRegHandler = (req, res, next) => {
    console.log("from farmRegHandler, Farm Data:");
    console.log(req.body);

    try {
        console.log(req.body);
        let newUserFarm = new User({
            farmName: req.body.farmName,
            farmDescription: req.body.farmDescription,
            farmAddress: req.body.farmAddress,
            farmCity: req.body.farmCity,
            farmState: req.body.farmState,
            farmZip: req.body.farmZip,
            farmImage: req.body.farmImage,
            farmWebsite: req.body.farmWebsite,
            farmEmail: req.body.farmEmail,
        })
        console.log(newUserFarm);
        let result = await newUserFarm.save();
        console.log(result);
        res.send("Farm created");

    } catch (err) {
        console.error(err);
    }
}

module.exports = farmRegHandler;