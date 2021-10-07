const User = require('../models/user');
const profileFilter = require('./profileFilter');


/*------------------------------------------------------------------
 Handler function to process POST to create user profile -> /register
-------------------------------------------------------------------*/
const userRegHandler = async (req, res, next) => {

    /*--Front end needs to pass in an object called profileData which contains
        a property called "profileSection" which will contain the user registration
        data.  It should include a "profileSection" property set to "USER".
            { "profileData": {
                    "profileSection": "USER",
                    "firstName": "xxx",
                     cont...
                } 
            }
    */
    console.log("User data received via req.body: ");
    console.log(req.body);

    //will have to hash password before creating user in next sprint
    try {

        //create new user schema
        let newUser = new User({
            firstName: req.body.profileData.firstName,
            lastName: req.body.profileData.lastName,
            email: req.body.profileData.email,
            userName: req.body.profileData.userName,
            password: req.body.profileData.password,
            likedFarms: [
                {
                    farmId: "",
                    farmRating: ""
                }
            ],
            userFarms: [
                {
                    farmId: `${req.body.profileData.userName}-F1`,
                    farmName: "",
                    farmDescription: "",
                    farmAddress: "",
                    farmCity: "",
                    farmState: "",
                    farmZip: "",
                    farmImage: "",
                    farmWebsite: "",
                    farmEmail: "",
                    farmInventory: [
                        {
                            productId: `${req.body.profileData.userName}-SKU-1`,
                            productCategory: "",
                            productName: "",
                            productDescription: "",
                            productQty: 0,
                            productUnitPrice: 0
                        }
                    ],
                    farmEvents: [
                        {
                            eventId: `${req.body.profileData.userName}-EVT-1`,
                            eventName: "",
                            eventAddress: "",
                            eventCity: "",
                            eventState: "",
                            eventZip: "",
                            eventStartDate: "",
                            eventFinishDate: ""
                        }
                    ]
                }
            ]

        });

        //save to database and get result object returned
        let result = await newUser.save();
        if (result) {
            if (req.body.profileData.profileSection === "ALL") {
                res.status(200).send(result);
            } else {
                //filter result based on profileSection property received
                const returnObj = profileFilter(req.body.profileData.profileSection, result);
                console.log("Sending returnObj: ");
                console.log(returnObj);
                return res.status(200).send(returnObj);
            }
        } else {
            res.status(500).send({ message: "error during create"});
        }


    } catch (err) {
        console.error(err);
        res.status(500).send();
    };
};


module.exports = userRegHandler;