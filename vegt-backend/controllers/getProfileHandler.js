const User = require('../models/user');


/*---------------------------------------------------------------
 Handler function for GET profile route -> /profile
----------------------------------------------------------------*/
const getProfileHandler = (req, res, next) => {

    /*---------------------------------------------------------- 
        1) Handler will findById which was extracted from token and set to req.user property 

        2) If "profileSection" is passed in, then route will return filtered user data as requested
        profileSection values can be: "USER", "FARM", "ALL". 
        If no value is entered or the property is missing, GET route will default 
        to "ALL" information about the user
            { 
                    "profileSection": "USER" 
            }
    */

    //User was extracted from token and passed in via req.user property in order to findById()
    let _id = req.user._id;

    let profileSection = "ALL";
    let projections = ``;

    //helper function to load the projections requested
    const loadProjections = () => {

        switch (profileSection) {
            case "USER":
                projections = `' _id firstName lastName userName email isAdmin isFarmer likedFarms '`;
                break;

            case "FARM":
                projections = `' _id userFarms '`;
                break;

            default:
            //default will send back ALL information
        };
        return;
    };

    // Check for profile section and load if passed in 
    if (req.body.profileSection) {
        profileSection = req.body.profileSection;
    };
   
    //load the projections
    loadProjections();

    //get user object from database 
    try {
        User.findById(_id, projections)
            .exec(function (err, foundObject) {
                if (!foundObject) {
                    console.log("User not found");
                    return res.status(404).json({ message: "Invalid User or Password" });
                }
                if (foundObject.isDeleted) {
                    console.log("User account deleted, please talk to your administrator");
                    return res.status(403).json({ message: "User account deleted" });
                }
 
                res.status(200).send(foundObject);

            });

    } catch (err) {
        console.error(err);
    };

};

module.exports = getProfileHandler;