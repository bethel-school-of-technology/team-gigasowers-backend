const User = require('../models/user');
const profileFilter = require('./profileFilter');


/*---------------------------------------------------------------
 Handler function for PUT update user profile route -> /update
----------------------------------------------------------------*/
const profileHandler = (req, res, next) => {

    /*--Front end needs to pass in an object called profileData which contains
        the profile data to be updated. In addition, a property called "profileSection" 
        is available to utilize which will indicate what data should
        be returned to the frontend.  Values can be: "USER", "FARM", "ALL". If 
        no value is entered or the property is missing, only a res.status code 
        will be returned. See example below:
            { "profileData": {
                    "profileSection": "ALL",
                    "userName": "new user name",
                    "isFarmer": true,
                    etc...
                } 
            }
    */
    //console.log("User data received via req.body.profileData: ");
    //console.log(req.body);

    //User was extracted from token and passed in via req.user property in order to findById()
    const _id = req.user._id;


    //get user object from database before updating with incoming data
    try {
        if (!req.body.profileData) {
            return res.status(400).json({ message: "Invalid profileData Object" });
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

                //process received req.body.profileData into foundObject
                loadProfileData(foundObject);

                //save to the database will return an updated object
                foundObject.save(function (err, updatedObject) {
                    if (err) {
                        console.log(err);
                        res.status(500).send();
                    }
                    if (updatedObject) {
                        if (req.body.profileData.profileSection === "ALL") {
                            res.status(200).send(updatedObj);
                        } else {
                            const returnObj = profileFilter(req.body.profileData.profileSection, updatedObject);
                            console.log("Sending returnObj: ");
                            console.log(returnObj);
                            return res.status(200).send(returnObj);
                        }
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
            foundObject.password = req.body.profileData.password;  //need to hash in the next sprint
        };
        if (req.body.profileData.isAdmin) {
            foundObject.isAdmin = req.body.profileData.isAdmin;
        };
        if (req.body.profileData.likedFarms) {
            foundObject.likedFarms = JSON.parse(JSON.stringify(req.body.profileData.likedFarms));
        };
        if (req.body.profileData.isFarmer) {
            foundObject.isFarmer = req.body.profileData.isFarmer;
        };
        if (req.body.profileData.userFarms) {
            foundObject.userFarms = JSON.parse(JSON.stringify(req.body.profileData.userFarms));
        };
        if (req.body.profileData.isDeleted) {
            foundObject.isDeleted = req.body.profileData.isDeleted;
        };

        return foundObject;
    };


}

module.exports = profileHandler;