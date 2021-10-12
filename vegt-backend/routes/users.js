var express = require('express');
var router = express.Router();
const authService = require('../services/auth');


//import controllers
const loginHandler = require('../controllers/loginHandler');
const userRegHandler = require('../controllers/userRegHandler');
const profileHandler = require('../controllers/profileHandler');
const getProfileHandler = require('../controllers/getProfileHandler');
const getFarmsHandler = require('../controllers/getFarmsHandler');


// get token from req header
const getToken = (req) => {

    let header = req.headers.authorization;
    if (!header) {
        return null;
    }

    if (header.startsWith("Bearer ")) {
        let token = header.split(' ')[1];
        //console.log("Bearer " + token);
        return token;
    } else {
        return null;
    }

};


/*------------------------------------
          ROUTE ENDPOINTS 
--------------------------------------*/

//route for login -> /login
router.post('/login', async (req, res, next) => {
    //call login handler 
    loginHandler(req, res, next);
});

//route for user registration (Add User) -> /register
router.post('/register', async (req, res, next) => {
    //call user registration handler 
    userRegHandler(req, res, next);
});

//route to GET Farms info -> /farms
router.get('/farms', async (req, res, next) => {
    //call to get all farms 
    getFarmsHandler(req, res, next);
});

/*---------------------------------------------
//route to update user profile info -> /update
-----------------------------------------------*/
router.put('/update', async (req, res, next) => {

    //validate token / get the user
    let token = getToken(req);

    if (!token) {
        return res.status(401).json({ message: "No Authorized Token Available" });
    };

    //verifyUser is logged in
    let user = await authService.verifyUser(token);
    if (!user) {
        return res.status(401).json({ message: "Must be logged in" });
    };

    //verify user is not classified as deleted
    if (user.isDeleted) {
        return res.status(403).json({ message: "User account deleted" });
    };

    req.user = user;  //Add valid user from the token to the req.user property
    profileHandler(req, res, next);  //call profile handler 

});


/*---------------------------------------------
//route to GET user profile info -> /profile
-----------------------------------------------*/
router.get('/profile', async (req, res, next) => {

    //validate token / get the user
    let token = getToken(req);

    if (!token) {
        return res.status(401).json({ message: "No Authorized Token Available" });
    };

    //verifyUser is logged in
    let user = await authService.verifyUser(token);
    if (!user) {
        return res.status(401).json({ message: "Must be logged in" });
    };

    //verify user is not classified as deleted
    if (user.isDeleted) {
        return res.status(403).json({ message: "User account deleted" });
    };

    req.user = user;  //Add valid user from the token to the req.user property
    getProfileHandler(req, res, next);

});



module.exports = router;
