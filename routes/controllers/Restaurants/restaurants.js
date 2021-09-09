const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const Restaurants = require('../../../models/Restaurants');
const asyncHandler = require('../../../middlewares/async');
const ErrorResponse = require('../../utils/errorResponse');
/*
 * @route : POST /api/restaurant
 * @desc : POST Single Restaurant
 * @access : PRIVATE
 */
exports.createRestaurants = asyncHandler(async (req, res, next) => {
    const errors = expressValidator.validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ErrorResponse(`Errors on Restaurants`, 502));
    } else {
        try {
            if (req.user.role !== 'owner') {
                return next(
                    new ErrorResponse(`Only Owner can create Restaurants`, 403)
                );
            }
            const findResturante = await Restaurants.findOne({
                name: req.body.name
            });

            if (!findResturante) {
                const order = new Restaurants({
                    ...req.body,
                    user: {
                        email: req.user.email,
                        role: req.user.role,
                        userId: req.user._id
                    }
                });
                const createdRestaurants = await order.save();
                res.status(200).json({
                    success: true,
                    data: createdRestaurants
                });
            } else {
                return next(
                    new ErrorResponse(`Restaurants is already exist`, 403)
                );
            }

            // return next(new ErrorResponse(`Card already exist ${req.body.name}`, 404));
            // return res.send({ message: req.t('user_create_success') });
        } catch (err) {
            console.log('err :', err);
            // next(err);
            return next(new ErrorResponse(`Failed to create Restaurant`, 502));
            // return res.status(502).send({ message:req.t(err.message) })
        }
    }
});

/*
 * @route : GET /api/restaurant
 * @desc : Get Restaurants
 * @access : PRIVATE
 */
exports.fetchRestaurants = asyncHandler(async (req, res, next) => {
    const restaurants = await Restaurants.find();
    if (!restaurants) {
        return next(new ErrorResponse(`Restaurants failed to fetch`, 404));
    }
    res.status(200).json({ success: true, data: restaurants });
});
