

const profileFilter = (profileSection, profileObj) => {

    console.log(profileSection);
    console.log(profileObj);

    let filteredObj = {};
    let returnObj = {};

    //helper function to filter out farm info and return only user info
    filterForUserOnly = () => {

        if (profileObj._id) {
            filteredObj = { ...filteredObj, "_id": profileObj._id };
        };
        if (profileObj.firstName) {
            filteredObj = { ...filteredObj, "firstName": profileObj.firstName };
        };
        if (profileObj.lastName) {
            filteredObj = { ...filteredObj, "lastName": profileObj.lastName };
        };
        if (profileObj.email) {
            filteredObj = { ...filteredObj, "email": profileObj.email };
        };
        if (profileObj.userName) {
            filteredObj = { ...filteredObj, "userName": profileObj.userName };
        };
        if (profileObj.isAdmin) {
            filteredObj = { ...filteredObj, "isAdmin": profileObj.isAdmin };
        };
        if (profileObj.likedFarms) {
            filteredObj = { ...filteredObj, "likedFarms": JSON.parse(JSON.stringify(profileObj.likedFarms)) };
        };
        if (profileObj.isFarmer) {
            filteredObj = { ...filteredObj, "isFarmer": profileObj.isFarmer };
        };
        if (profileObj.isDeleted) {
            filteredObj = { ...filteredObj, "isDeleted": profileObj.isDeleted };
        };

        return filteredObj;
    };

    //helper function to filter and return farm info (along with user _id just in case it's needed)
    filterForFarmOnly = () => {
        console.log("i maded it to the filterForFarmOnly function");

        if (profileObj._id) {
            filteredObj = { ...filteredObj, "_id": profileObj._id };
        };
        if (profileObj.isFarmer) {
            filteredObj = { ...filteredObj, "isFarmer": profileObj.isFarmer };
        };
        if (profileObj.userFarms) {
            filteredObj = { ...filteredObj, "userFarms": JSON.parse(JSON.stringify(profileObj.userFarms)) };
        };

        return filteredObj;
    };

    /*-------------------------------------------------------------------------------
        Determine what to return by incoming property called: "profileSection":
        Property value needs to be one of the following: "USER", "FARM"
        Response will contain updated profile object with requested data only 
        No profileSection indicated will default to returning an empty object
    ---------------------------------------------------------------------------------*/
    //Determine what profileSection to return
    switch (profileSection) {
        case "USER":
            returnObj = filterForUserOnly();
            break;

        case "FARM":
            returnObj = filterForFarmOnly()
            break;

        default:
            //default will send back the empty obj
           

    };
    
    return returnObj;

};

module.exports = profileFilter;