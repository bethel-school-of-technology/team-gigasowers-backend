const User = require('../models/user');
const authService = require('../services/auth');


/*------------------------------------------------------------------
 Handler function to process POST to create user profile -> /register
-------------------------------------------------------------------*/
const userRegHandler = async (req, res, next) => {


    try {

        //create new user schema
        let newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            userName: req.body.userName,
            password: authService.hashPassword(req.body.password),
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            isFarmer: req.body.isFarmer,
            likedFarms: [
                {
                    farmId: "",
                    farmRating: ""
                }
            ],
            userFarms:
            {
                farmId: "1",
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
                    // {
                    //     productId: "",
                    //     productCategory: "",
                    //     productName: "",
                    //     productDescription: "",
                    //     productQty: 0,
                    //     productUnitPrice: 0,
                    //     productImage: ""
                    // }
                ],
                farmEvent: [
                    // {
                    //     eventId: "",
                    //     eventName: "",
                    //     eventAddress: "",
                    //     eventCity: "",
                    //     eventState: "",
                    //     eventZip: "",
                    //     eventStartDate: "",
                    //     eventFinishDate: "",
                    //     eventImage: ""
                    // }
                ]
            }

        });

        //save to database and get result object returned
        let result = await newUser.save();
        if (result) {
            return res.status(200).send();

        } else {
            return res.status(500).json({ message: "error saving user to database" });

        }

    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    };
};


module.exports = userRegHandler;