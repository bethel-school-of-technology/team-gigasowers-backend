const User = require('../models/user');
const authService = require('../services/auth');


/*---------------------------------------------------------------
 Handler function for PUT update user profile route -> /update
----------------------------------------------------------------*/
const profileHandler = (req, res, next) => {

    //User was extracted from token and passed in via req.user property in order to findById()
    const _id = req.user._id;


    //get user object from database before updating with incoming data
    try {

        if (!req.body) {
            return res.status(400).json({ message: "Invalid Object" });
        }

        User.findOne({ "_id": _id })
            .exec(function (err, foundObject) {
                if (!foundObject) {
                    console.log("User not found");
                    return res.status(404).json({ message: "Invalid User or Password" });
                }
                if (foundObject.isDeleted) {
                    console.log("User account deleted, please talk to your administrator");
                    return res.status(403).json({ message: "User account deleted" });
                }

                //process received req.body into found user Object
                loadForUpdate(foundObject);

                //save to the database will return an updated object
                foundObject.save(function (err, updatedObject) {
                    if (err) {
                        console.log(err);
                        res.status(500).send({ "message": err });
                    }
                    if (updatedObject) {
                        return res.status(200).send();
                    }
                });


            });

    } catch (err) {
        console.error(err);
    };


    //Load found object user properties with received data
    loadForUpdate = (foundObject) => {

        if (req.body.firstName) {
            foundObject.firstName = req.body.firstName;
        };
        if (req.body.lastName) {
            foundObject.lastName = req.body.lastName;
        };
        if (req.body.email) {
            foundObject.email = req.body.email;
        };
        if (req.body.userName) {
            foundObject.userName = req.body.userName;
        };
        if (req.body.password) {
            foundObject.password = authService.hashPassword(req.body.password);
        };
        if (req.body.address) {
            foundObject.address = req.body.address;
        };
        if (req.body.city) {
            foundObject.city = req.body.city;
        };
        if (req.body.state) {
            foundObject.state = req.body.state;
        };
        if (req.body.zip) {
            foundObject.zip = req.body.zip;
        };
        if (req.body.isAdmin) {
            foundObject.isAdmin = req.body.isAdmin;
        };
        if (req.body.isFarmer) {
            foundObject.isFarmer = req.body.isFarmer;
        };
        if (req.body.likedFarms) {
            foundObject.likedFarms = JSON.parse(JSON.stringify(req.body.likedFarms));
        };
        if (req.body.isDeleted) {
            foundObject.isDeleted = req.body.isDeleted;
        };
        if (req.body.farmId) {
            foundObject.userFarms.farmId = req.body.farmId;
        };
        if (req.body.farmName) {
            foundObject.userFarms.farmName = req.body.farmName;
        };
        if (req.body.farmDescription) {
            foundObject.userFarms.farmDescription = req.body.farmDescription;
        };
        if (req.body.farmAddress) {
            foundObject.userFarms.farmAddress = req.body.farmAddress;
        };
        if (req.body.farmCity) {
            foundObject.userFarms.farmCity = req.body.farmCity;
        };
        if (req.body.farmState) {
            foundObject.userFarms.farmState = req.body.farmState;
        };
        if (req.body.farmZip) {
            foundObject.userFarms.farmZip = req.body.farmZip;
        };
        if (req.body.farmImage) {
            foundObject.userFarms.farmImage = req.body.farmImage;
        };
        if (req.body.farmWebsite) {
            foundObject.userFarms.farmWebsite = req.body.farmWebsite;
        };
        if (req.body.farmEmail) {
            foundObject.userFarms.farmEmail = req.body.farmEmail;
        };
        if (req.body.hasOwnProperty('farmInventory')) {
            let fInv = req.body.farmInventory;
            for (let i = 0; i < fInv.length; i++) {
                foundObject.userFarms.farmInventory[i] = {
                    ...foundObject.userFarms.farmInventory[i],
                    'productId': fInv[i].productId,
                    'productCategory': fInv[i].productCategory,
                    'productName': fInv[i].productName,
                    'productDescription': fInv[i].productDescription,
                    'productQty': fInv[i].productQty,
                    'productUnitPrice': fInv[i].productUnitPrice,
                    'productImage': fInv[i].productImage
                };
            };
        };
        if (req.body.hasOwnProperty('farmEvent')) {
            let fEvent = req.body.farmEvent;
            for (let i = 0; i < fEvent.length; i++) {
                foundObject.userFarms.farmEvent[i] = {
                    ...foundObject.userFarms.farmEvent[i],
                    'eventId': fEvent[i].eventId,
                    'eventName': fEvent[i].eventName,
                    'eventAddress': fEvent[i].eventAddress,
                    'eventCity': fEvent[i].eventCity,
                    'eventState': fEvent[i].eventState,
                    'eventZip': fEvent[i].eventZip,
                    'eventStartDate': fEvent[i].eventStartDate,
                    'eventFinishDate': fEvent[i].eventFinishDate,
                    'eventImage': fEvent[i].eventImage
                };
            };
        };

        return foundObject;
    };

};

module.exports = profileHandler;