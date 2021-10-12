const User = require('../models/user');


/*---------------------------------------------------------------
 Handler function for GET farms route -> /farms
----------------------------------------------------------------*/
const getFarmsHandler = (req, res, next) => {

  
    let projections = `' _id userFarms '`;

    //get user object from database 
    try {
        User.find({ "isDeleted": false, "isFarmer": true }, projections)
            .exec(function (err, foundObject) {
                if (!foundObject) {
                    console.log("Farms not found");
                    return res.status(404).json({ message: "No Farms Found" });
                }
 
                //console.log("farms found: ");
                //console.log(foundObject);
                res.status(200).send(foundObject);

            });

    } catch (err) {
        console.error(err);
    };


};

module.exports = getFarmsHandler;