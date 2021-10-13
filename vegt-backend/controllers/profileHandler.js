const User = require('../models/user');
const profileFilter = require('./profileFilter');
const authService = require('../services/auth');


/*---------------------------------------------------------------
 Handler function for PUT update user profile route -> /update
----------------------------------------------------------------*/
const profileHandler = (req, res, next) => {

    /*
        1) Handler will use the extracted user id from token to do the findById and update
        2) An additional property can be passed called "profileSection" to request a 
        result set to return. Values can be: "USER", "FARM", "ALL".  Empty string will 
        return just the res.status code
        
            { "profileData": {
                    "profileSection": "", 
                    etc...
                } 
            }
    */

    //User was extracted from token and passed in via req.user property in order to findById()
    const _id = req.user._id;
    let returnProfileRequested = "";

    //get user object from database before updating with incoming data
    try {

        if (!req.body.profileData) {
            return res.status(400).json({ message: "Invalid profileData Object" });
        }
        if (req.body.profileData.profileSection) {
            returnProfileRequested = req.body.profileData.profileSection;
        }

        User.findOne({ "_id": _id },)
            .exec(function (err, foundObject) {
                if (!foundObject) {
                    console.log("User not found");
                    return res.status(404).json({ message: "Invalid User or Password" });
                }
                if (foundObject.isDeleted) {
                    console.log("User account deleted, please talk to your administrator");
                    return res.status(403).json({ message: "User account deleted" });
                }

                //process received req.body.profileData into found user Object
                loadProfileData(foundObject);

                //save to the database will return an updated object
                foundObject.save(function (err, updatedObject) {
                    if (err) {
                        console.log(err);
                        res.status(500).send({ "message": err });
                    }
                    if (updatedObject) {

                        switch (returnProfileRequested) {
                            case "ALL":
                                return res.status(200).send(updatedObject);
                                break;

                            case "":
                                return res.status(200).send();
                                break;

                            default:
                                //filter and return result based on profileSection property received
                                const returnObj = profileFilter(returnProfileRequested, updatedObject);
                                console.log("Sending returnObj: ");
                                console.log(returnObj);
                                return res.status(200).send(returnObj);

                        };

                    }

                });


            });

    } catch (err) {
        console.error(err);
    };


    //Load found object user properties with received data
    loadProfileData = (foundObject) => {

        if (req.body.profileData._id) {
            foundObject._id = req.body.profileData._id;
        };
        if (req.body.profileData.firstName) {
            foundObject.firstName = req.body.profileData.firstName;
        };
        if (req.body.profileData.lastName) {
            foundObject.lastName = req.body.profileData.lastName;
        };
        if (req.body.profileData.email) {
            foundObject.email = req.body.profileData.email;
        };
        if (req.body.profileData.userName) {
            foundObject.userName = req.body.profileData.userName;
        };
        if (req.body.profileData.password) {
            foundObject.password = authService.hashPassword(req.body.profileData.password);
        };
        if (req.body.profileData.address) {
            foundObject.address = req.body.profileData.address;
        };
        if (req.body.profileData.city) {
            foundObject.city = req.body.profileData.city;
        };
        if (req.body.profileData.state) {
            foundObject.state = req.body.profileData.state;
        };
        if (req.body.profileData.zip) {
            foundObject.zip = req.body.profileData.zip;
        };
        if (req.body.profileData.isAdmin) {
            foundObject.isAdmin = req.body.profileData.isAdmin;
        };
        if (req.body.profileData.isFarmer) {
            foundObject.isFarmer = req.body.profileData.isFarmer;
        };
        if (req.body.profileData.likedFarms) {
            foundObject.likedFarms = JSON.parse(JSON.stringify(req.body.profileData.likedFarms));
        };
        if (req.body.profileData.isDeleted) {
            foundObject.isDeleted = req.body.profileData.isDeleted;
        };
        if (req.body.profileData.userFarms.farmId) {
            foundObject.userFarms.farmId = req.body.profileData.userFarms.farmId;
        };
        if (req.body.profileData.userFarms.farmName) {
            foundObject.userFarms.farmName = req.body.profileData.userFarms.farmName;
        };
        if (req.body.profileData.userFarms.farmDescription) {
            foundObject.userFarms.farmDescription = req.body.profileData.userFarms.farmDescription;
        };
        if (req.body.profileData.userFarms.farmAddress) {
            foundObject.userFarms.farmAddress = req.body.profileData.userFarms.farmAddress;
        };
        if (req.body.profileData.userFarms.farmCity) {
            foundObject.userFarms.farmCity = req.body.profileData.userFarms.farmCity;
        };
        if (req.body.profileData.userFarms.farmState) {
            foundObject.userFarms.farmState = req.body.profileData.userFarms.farmState;
        };
        if (req.body.profileData.userFarms.farmZip) {
            foundObject.userFarms.farmZip = req.body.profileData.userFarms.farmZip;
        };
        if (req.body.profileData.userFarms.farmImage) {
            foundObject.userFarms.farmImage = req.body.profileData.userFarms.farmImage;
        };
        if (req.body.profileData.userFarms.farmWebsite) {
            foundObject.userFarms.farmWebsite = req.body.profileData.userFarms.farmWebsite;
        };
        if (req.body.profileData.userFarms.farmEmail) {
            foundObject.userFarms.farmEmail = req.body.profileData.userFarms.farmEmail;
        };
        if (req.body.profileData.userFarms.farmEmail) {
            foundObject.userFarms.farmEmail = req.body.profileData.userFarms.farmEmail;
        };
        // if (req.body.profileData.userFarms.farmInventory.productId) {
        //     foundObject.userFarms.farmInventory.productId = req.body.profileData.userFarms.farmInventory.productId;
        // };
        // if (req.body.profileData.userFarms.farmInventory.productCategory) {
        //     foundObject.userFarms.farmInventory.productCategory = req.body.profileData.userFarms.farmInventory.productCategory;
        // };
        // if (req.body.profileData.userFarms.farmInventory.productName) {
        //     foundObject.userFarms.farmInventory.productName = req.body.profileData.userFarms.farmInventory.productName;
        // };
        // if (req.body.profileData.userFarms.farmInventory.productDescription) {
        //     foundObject.userFarms.farmInventory.productDescription = req.body.profileData.userFarms.farmInventory.productDescription;
        // };
        // if (req.body.profileData.userFarms.farmInventory.productQty) {
        //     foundObject.userFarms.farmInventory.productQty = req.body.profileData.userFarms.farmInventory.productQty;
        // };
        // if (req.body.profileData.userFarms.farmInventory.productUnitPrice) {
        //     foundObject.userFarms.farmInventory.productUnitPrice = req.body.profileData.userFarms.farmInventory.productUnitPrice;
        // };
        // if (req.body.profileData.userFarms.farmEvent.eventId) {
        //     foundObject.userFarms.farmEvent.eventId = req.body.profileData.userFarms.farmEvent.eventId;
        // };
        // if (req.body.profileData.userFarms.farmEvent.eventName) {
        //     foundObject.userFarms.farmEvent.eventName = req.body.profileData.userFarms.farmEvent.eventName;
        // };
        // if (req.body.profileData.userFarms.farmEvent.eventAddress) {
        //     foundObject.userFarms.farmEvent.eventAddress = req.body.profileData.userFarms.farmEvent.eventAddress;
        // };
        // if (req.body.profileData.userFarms.farmEvent.eventCity) {
        //     foundObject.userFarms.farmEvent.eventCity = req.body.profileData.userFarms.farmEvent.eventCity;
        // };
        // if (req.body.profileData.userFarms.farmEvent.eventState) {
        //     foundObject.userFarms.farmEvent.eventState = req.body.profileData.userFarms.farmEvent.eventState;
        // };
        // if (req.body.profileData.userFarms.farmEvent.eventZip) {
        //     foundObject.userFarms.farmEvent.eventZip = req.body.profileData.userFarms.farmEvent.eventZip;
        // };
        // if (req.body.profileData.userFarms.farmEvent.eventStartDate) {
        //     foundObject.userFarms.farmEvent.eventStartDate = req.body.profileData.userFarms.farmEvent.eventStartDate;
        // };
        // if (req.body.profileData.userFarms.farmEvent.eventFinishDate) {
        //     foundObject.userFarms.farmEvent.eventFinishDate = req.body.profileData.userFarms.farmEvent.eventFinishDate;
        // };

        return foundObject;
    };

}

module.exports = profileHandler;