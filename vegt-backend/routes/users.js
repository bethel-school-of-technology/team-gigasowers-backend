var express = require('express');
var router = express.Router();


//import controllers
const loginHandler = require('../controllers/loginHandler');
const userRegHandler = require('../controllers/userRegHandler');
const farmRegHandler = require('../controllers/farmRegHandler');



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


module.exports = router;
