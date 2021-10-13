

const profileFilter = (profileSection, profileObj) => {

    //console.log(profileSection);
    //console.log(profileObj);

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
        if (profileObj.address) {
            filteredObj = { ...filteredObj, "address": profileObj.address };
        };
        if (profileObj.city) {
            filteredObj = { ...filteredObj, "city": profileObj.city };
        };
        if (profileObj.state) {
            filteredObj = { ...filteredObj, "state": profileObj.state };
        };
        if (profileObj.zip) {
            filteredObj = { ...filteredObj, "zip": profileObj.zip };
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

        if (profileObj._id) {
            filteredObj = { ...filteredObj, "_id": profileObj._id };
        };
        if (profileObj.isFarmer) {
            filteredObj = { ...filteredObj, "isFarmer": profileObj.isFarmer };
        };
        if (profileObj.userFarms.farmId) {
            filteredObj = { ...filteredObj, "userFarms.farmId": profileObj.userFarms.farmId };
        };
        if (profileObj.userFarms.farmName) {
            filteredObj = { ...filteredObj, "userFarms.farmName": profileObj.userFarms.farmName };
        };
        if (profileObj.userFarms.farmDescription) {
            filteredObj = { ...filteredObj, "userFarms.farmDescription": profileObj.userFarms.farmDescription };
        };
        if (profileObj.userFarms.farmAddress) {
            filteredObj = { ...filteredObj, "userFarms.farmAddress": profileObj.userFarms.farmAddress };
        };
        if (profileObj.userFarms.farmCity) {
            filteredObj = { ...filteredObj, "userFarms.farmCity": profileObj.userFarms.farmCity };
        };
        if (profileObj.userFarms.farmState) {
            filteredObj = { ...filteredObj, "userFarms.farmState": profileObj.userFarms.farmState };
        };
        if (profileObj.userFarms.farmZip) {
            filteredObj = { ...filteredObj, "userFarms.farmZip": profileObj.userFarms.farmZip };
        };
        if (profileObj.userFarms.farmImage) {
            filteredObj = { ...filteredObj, "userFarms.farmImage": profileObj.userFarms.farmImage };
        };
        if (profileObj.userFarms.farmWebsite) {
            filteredObj = { ...filteredObj, "userFarms.farmWebsite": profileObj.userFarms.farmWebsite };
        };
        if (profileObj.userFarms.farmEmail) {
            filteredObj = { ...filteredObj, "userFarms.farmEmail": profileObj.userFarms.farmEmail };
        };
        if (profileObj.userFarms.farmInventory.productId) {
            filteredObj = { ...filteredObj, "userFarms.farmInventory.productId": profileObj.userFarms.farmInventory.productId };
        };
        if (profileObj.userFarms.farmInventory.productCategory) {
            filteredObj = { ...filteredObj, "userFarms.farmInventory.productCategory": profileObj.userFarms.farmInventory.productCategory };
        };
        if (profileObj.userFarms.farmInventory.productName) {
            filteredObj = { ...filteredObj, "userFarms.farmInventory.productName": profileObj.userFarms.farmInventory.productName };
        };
        if (profileObj.userFarms.farmInventory.productDescription) {
            filteredObj = { ...filteredObj, "userFarms.farmInventory.productDescription": profileObj.userFarms.farmInventory.productDescription };
        };
        if (profileObj.userFarms.farmInventory.productQty) {
            filteredObj = { ...filteredObj, "userFarms.farmInventory.productQty": profileObj.userFarms.farmInventory.productQty };
        };
        if (profileObj.userFarms.farmInventory.productUnitPrice) {
            filteredObj = { ...filteredObj, "userFarms.farmInventory.productUnitPrice": profileObj.userFarms.farmInventory.productUnitPrice };
        };
        if (profileObj.userFarms.farmEvent.eventId) {
            filteredObj = { ...filteredObj, "userFarms.farmEvent.eventId": profileObj.userFarms.farmEvent.eventId };
        };
        if (profileObj.userFarms.farmEvent.eventName) {
            filteredObj = { ...filteredObj, "userFarms.farmEvent.eventName": profileObj.userFarms.farmEvent.eventName };
        };
        if (profileObj.userFarms.farmEvent.eventAddress) {
            filteredObj = { ...filteredObj, "userFarms.farmEvent.eventAddress": profileObj.userFarms.farmEvent.eventAddress };
        };
        if (profileObj.userFarms.farmEvent.eventCity) {
            filteredObj = { ...filteredObj, "userFarms.farmEvent.eventCity": profileObj.userFarms.farmEvent.eventCity };
        };
        if (profileObj.userFarms.farmEvent.eventState) {
            filteredObj = { ...filteredObj, "userFarms.farmEvent.eventState": profileObj.userFarms.farmEvent.eventState };
        };
        if (profileObj.userFarms.farmEvent.eventZip) {
            filteredObj = { ...filteredObj, "userFarms.farmEvent.eventZip": profileObj.userFarms.farmEvent.eventZip };
        };
        if (profileObj.userFarms.farmEvent.eventStartDate) {
            filteredObj = { ...filteredObj, "userFarms.farmEvent.eventStartDate": profileObj.userFarms.farmEvent.eventStartDate };
        };
        if (profileObj.userFarms.farmEvent.eventFinishDate) {
            filteredObj = { ...filteredObj, "userFarms.farmEvent.eventFinishDate": profileObj.userFarms.farmEvent.eventFinishDate };
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