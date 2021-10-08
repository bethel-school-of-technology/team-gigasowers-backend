const User = require('../models/user');
const profileFilter = require('./profileFilter');


/*---------------------------------------------------------------
 Handler function for GET profile route -> /profile
----------------------------------------------------------------*/
const getProfileHandler = (req, res, next) => {

    /*--Handler will look for either "_id" or "userName" passed in the profileData object
        If no "_id" or "userName" is passed in the profileData object, then route will return ALL - User.find()
        If "profileSection" is passed in the profileData obj, then route will return filtered user data as requested
        profileSection values can be: "USER", "FARM", "ALL". If no value is entered or the property is missing, 
        GET route will default to "ALL" information about the user
            { "profileData": {
                    "profileSection": "USER",
                    "_id": userId,
                    "userName": userName
                } 
            }
    */
    console.log("User data received via req.body.profileData: ");
    console.log(req.body);

    let profileSection = "";
    let _id = "";
    let userName = "";
    let query = {};
    let projections = ``;

    //helper function to load the projections requested
    const loadProjections = () => {

        switch (profileSection) {
            case "USER":
                projections = `'_id firstName lastName userName email isAdmin likedFarms isFarmer'`;
                break;

            case "FARM":
                projections = `'_id userFarms'`;
                break;

            default:
            //default will send back the empty obj

        };
        return;
    };

    //if no profileData object is sent then return error code 400 Bad Request
    if (req.body.profileData) {
        profileSection = req.body.profileData.profileSection;
        _id = req.body.profileData._id;
        userName = req.body.profileData.userName;
    } else{
        return res.status(400).json({ message: "Invalid Request Object Sent" });
    };


    //load the query; if neither id or user name are passed in, it will default to find ALL users
    if (userName) {
        query = { "userName": userName };
    }
    if (_id) {
        query = { "_id": _id };
    }
    console.log("query: ");
    console.log(query);
    //load the projections
    loadProjections();
    console.log("Projections loaded: ");
    console.log(projections);


    //get user object from database 
    try {
        User.find(query, projections)
            .exec(function (err, foundObject) {
                if (!foundObject) {
                    console.log("User not found");
                    return res.status(404).json({ message: "Invalid User or Password" });
                }
                if (foundObject.isDeleted) {
                    console.log("User account deleted, please talk to your administrator");
                    return res.status(403).json({ message: "User account deleted" });
                }
                console.log("foundObject: ");
                console.log(foundObject);
                res.status(200).send(foundObject);

            });

    } catch (err) {
        console.error(err);
    };


};

module.exports = getProfileHandler;