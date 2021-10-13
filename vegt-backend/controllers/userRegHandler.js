const User = require('../models/user');
const profileFilter = require('./profileFilter');
const authService = require('../services/auth');


/*------------------------------------------------------------------
 Handler function to process POST to create user profile -> /register
-------------------------------------------------------------------*/
const userRegHandler = async (req, res, next) => {

    /*
        1) Front end needs to pass in an object called profileData which contains
        a property called "profileSection" which will contain the user registration
        data.  
        2) An additional property can be passed called "profileSection" to request a 
        result set to return. Values can be: "USER", "FARM", "ALL".  Empty string will 
        return just the res.status code
        
            { "profileData": {
                    "profileSection": "", 
                    "firstName": "xxx",
                     cont...
                } 
            }
    */
    let returnProfileRequested = "";

    try {

        if (!req.body.profileData) {
            return res.status(400).json({ message: "Invalid profileData Object" });
        }
        if (req.body.profileData.profileSection) {
            returnProfileRequested = req.body.profileData.profileSection;
        }


        //create new user schema
        let newUser = new User({
            firstName: req.body.profileData.firstName,
            lastName: req.body.profileData.lastName,
            email: req.body.profileData.email,
            userName: req.body.profileData.userName,
            password: authService.hashPassword(req.body.profileData.password),
            address: req.body.profileData.address,
            city: req.body.profileData.city,
            state: req.body.profileData.state,
            zip: req.body.profileData.zip,
            isFarmer: req.body.profileData.isFarmer,
            likedFarms: [
                {
                    farmId: "",
                    farmRating: ""
                }
            ],
            userFarms:
            {
                farmId: "",
                farmName: "",
                farmDescription: "",
                farmAddress: "",
                farmCity: "",
                farmState: "",
                farmZip: "",
                farmImage: "",
                farmWebsite: "",
                farmEmail: "",
                farmInventory:
                {
                    productId: "",
                    productCategory: "",
                    productName: "",
                    productDescription: "",
                    productQty: 0,
                    productUnitPrice: 0
                },
                farmEvent:
                {
                    eventId: "",
                    eventName: "",
                    eventAddress: "",
                    eventCity: "",
                    eventState: "",
                    eventZip: "",
                    eventStartDate: "",
                    eventFinishDate: ""
                }
            }

        });

        //save to database and get result object returned
        let result = await newUser.save();
        if (result) {

            switch (returnProfileRequested) {
                case "ALL":
                    return res.status(200).send(result);
                    break;

                case "":
                    return res.status(200).send();
                    break;

                default:
                    //filter and return result based on profileSection property received
                    const returnObj = profileFilter(returnProfileRequested, result);
                    console.log("Sending returnObj: ");
                    console.log(returnObj);
                    return res.status(200).send(returnObj);

            };

        } else {
            return res.status(500).json({ message: "error saving user to database" });
          
        }


    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    };
};


module.exports = userRegHandler;