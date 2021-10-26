const User = require('../models/user');



/*---------------------------------------------------------------
 Handler function for PUT update product route -> /updateProduct
----------------------------------------------------------------*/
const productHandler = (req, res, next) => {

    console.log("product received for update: ");
    console.log(req.body);

    //User was extracted from token and passed in via req.user property in order to findById()
    const _id = req.user._id;

    try {

        if (!req.body) {
            return res.status(400).json({ message: "Invalid Object" });
        }

        User.findOne({ '_id': _id, 'isDeleted': false }
        )
            .exec(function (err, foundObject) {
                if (err) {
                    console.log(err);
                    res.status(500).send(`Product Update err: ${err}`);
                }
                if (foundObject) {

                    let fInv = foundObject.userFarms.farmInventory;
                    for (let i = 0; i < fInv.length; i++) {
                        if (fInv[i].productId === req.body.productId) {
                            foundObject.userFarms.farmInventory[i] = {
                                ...foundObject.userFarms.farmInventory[i],
                                'productId': req.body.productId,
                                'productCategory': req.body.productCategory,
                                'productName': req.body.productName,
                                'productDescription': req.body.productDescription,
                                'productQty': req.body.productQty,
                                'productUnitPrice': req.body.productUnitPrice,
                            };
                        }
                    };

                    //save to the database will return an updated object
                    foundObject.save(function (err, updatedObject) {
                        if (err) {
                            console.log(err);
                            res.status(500).send({ "Product Save err message": err });
                        }
                        if (updatedObject) {
                            return res.status(200).send(`Product Updated`);
                        }
                    });

                } else {
                    res.status(404).send(`Product Not found, Prouct Update Not Successful`);
                }
            });



    } catch (err) {
        console.error(`Product Update Try Catch err: ${err}`);
    };

};

module.exports = productHandler;