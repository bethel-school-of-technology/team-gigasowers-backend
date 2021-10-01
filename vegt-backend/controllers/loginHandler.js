const User = require('../models/user');

const loginHandler = (req, res, next) => {

    console.log("from loginHandler, User Data:");
    console.log(req.body);

    try {
        User.findOne({ "userName": req.body.loginData.userName, "password": req.body.loginData.userPass })
            .exec(function (err, user) {
                if (!user) {
                    console.log("User not found");
                    console.log("err: " + err);
                    return res.status(404).json({ message: "Invalid User or Password" });
                }
                if (user.isDeleted) {
                    console.log("User account deleted, please talk to your administrator");
                    return res.status(403).json({ message: "User account deleted" });
                }

                console.log(user.userName + " was found!");

                //Add Auth/JWT token code here in next sprint
                // let passwordMatch = authService.comparePasswords(newUser.password, user.password);
                // if (passwordMatch) {
                //     let token = authService.signUser(user); // <--- Uses the authService to create jwt token
                //     res.cookie('jwt', token); // <--- Adds token to response as a cookie
                // } else {
                //     console.log('Wrong password');
                
                // }

                return res.status(200).json({ message: "User Found" });
                
            });

    } catch (err) {
        console.error(err);
    }
}

module.exports = loginHandler;