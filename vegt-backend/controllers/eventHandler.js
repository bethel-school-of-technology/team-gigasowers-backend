const User = require('../models/user');



/*---------------------------------------------------------------
 Handler function for PUT update event route -> /updateEvent
----------------------------------------------------------------*/
const eventHandler = (req, res, next) => {

    console.log("event received for update: ");
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
                    res.status(500).send(`Event Update err: ${err}`);
                }
                if (foundObject) {
                    let fEvent = foundObject.userFarms.farmEvent;
                    for (let i = 0; i < fEvent.length; i++) {
                        if (fEvent[i].eventId === req.body.eventId) {
                            foundObject.userFarms.farmEvent[i] = {
                                ...foundObject.userFarms.farmEvent[i],
                                'eventId': req.body.eventId,
                                'eventName': req.body.eventName,
                                'eventAddress': req.body.eventAddress,
                                'eventCity': req.body.eventCity,
                                'eventState': req.body.eventState,
                                'eventZip': req.body.eventZip,
                                'eventStartDate': req.body.eventStartDate,
                                'eventFinishDate': req.body.eventFinishDate
                            };
                        }
                    };

                    //save to the database will return an updated object
                    foundObject.save(function (err, updatedObject) {
                        if (err) {
                            console.log(err);
                            res.status(500).send({ "Event Save err message": err });
                        }
                        if (updatedObject) {
                            return res.status(200).send(`Event Updated`);
                        }
                    });

                } else {
                    res.status(404).send(`Event Not found, Event Update Not Successful`);
                }
            });



    } catch (err) {
        console.error(`Event Update Try Catch err: ${err}`);
    };

};

module.exports = eventHandler;