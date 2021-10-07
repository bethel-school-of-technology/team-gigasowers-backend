var express = require('express');
var router = express.Router();


//import controllers
const loginHandler = require('../controllers/loginHandler');
const userRegHandler = require('../controllers/userRegHandler');
const farmRegHandler = require('../controllers/farmRegHandler');
const profileHandler = require('../controllers/profileHandler');



/*------------------------------------
          ROUTE ENDPOINTS 
--------------------------------------*/

//route for login -> /login
router.post('/login', async (req, res, next) => {
    //call login handler 
    loginHandler(req, res, next);
});

// route for user registration (Add User) -> /register
router.post('/register', async (req, res, next) => {
    //call user registration handler 
    userRegHandler(req, res, next);
});

//route to add farm registration profile info -> /farmRegister
router.post('/farmRegister', async (req, res, next) => {
    //call farm registration handler 
    farmRegHandler(req, res, next);
});

//route to update profile info -> /update
router.put('/update', async (req, res, next) => {
    //call profile handler 
    profileHandler(req, res, next);
});


module.exports = router;
