const User = require('../models/user');
const authService = require('../services/auth');

const loginHandler = (req, res, next) => {
    

    try {
        if (!req.body) {
            return res.status(400).json({ message: "Invalid loginData Object" });
        }

        User.findOne({ "userName": req.body.userName })
            .exec(function (err, user) {
                if (!user) {
                    console.log("User not found");
                    return res.status(404).json({ message: "User Not Found" });
                }
                if (user.isDeleted) {
                    console.log("User account deleted, please talk to your administrator");
                    return res.status(403).json({ message: "User account deleted" });
                }

                if (user) {
                    let passwordMatch = authService.comparePasswords(req.body.userPass , user.password);
                    if (passwordMatch) {

                      let token = authService.signUser(user); // <--- Uses the authService to create jwt token
                      //console.log(user.userName + " was found!");
                      return res.status(200).json({ 
                          "jwt": token,
                          "userId": user._id,
                          "userName": user.userName,
                          "isFarmer": user.isFarmer,
                          "isAdmin": user.isAdmin
                        });

                    } else {
                      console.log('Invalid Password');
                      return res.status(404).json({ message: "Invalid Password" });
                    }
                  }


            });

    } catch (err) {
        console.error(err);
    }
}

module.exports = loginHandler;