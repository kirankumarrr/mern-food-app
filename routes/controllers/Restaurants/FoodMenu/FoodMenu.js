const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const FoodMenu = require('../../../../models/FoodMenu');
const asyncHandler = require('../../../../middlewares/async');
const ErrorResponse = require('../../../utils/errorResponse');
/*
 * @route : POST /api/restaurant
 * @desc : POST Single Restaurant
 * @access : PRIVATE
 */
exports.createFoodMenu = asyncHandler(async (req, res, next) => {
    const errors = expressValidator.validationResult(req);
    const restaurantId = req.params.id;
    if (!errors.isEmpty()) {
        return next(new ErrorResponse(`Errors on Food Menu`, 502));
    } else {
        try {
            if (req.user.role !== 'owner') {
                return next(
                    new ErrorResponse(`Only Owner can create Food Menu`, 403)
                );
            }
            const findResturante = await FoodMenu.findOne({
                name: req.body.name
            });

            if (!findResturante) {
                const foodItem = new FoodMenu({
                    ...req.body,
                    userId: req.user._id,
                    restaurantId
                });
                const createdFoodMenu = await foodItem.save();
                res.status(200).json({
                    success: true,
                    data: createdFoodMenu
                });
            } else {
                return next(
                    new ErrorResponse(`Food Menu is already exist`, 403)
                );
            }

            // return next(new ErrorResponse(`Card already exist ${req.body.name}`, 404));
            // return res.send({ message: req.t('user_create_success') });
        } catch (err) {
            console.log('err :', err);
            // next(err);
            return next(new ErrorResponse(`Failed to create Food Menu`, 502));
            // return res.status(502).send({ message:req.t(err.message) })
        }
    }
});

/*
 * @route : GET /api/restaurant
 * @desc : Get FoodMenu
 * @access : PRIVATE
 */
exports.fetchFoodMenu = asyncHandler(async (req, res, next) => {
    try {
        const foodMenu = await FoodMenu.find({
            restaurantId: req.params.id
        });
        if (!foodMenu) {
            return next(new ErrorResponse(`FoodMenu failed to fetch`, 404));
        }
        res.status(200).json({ success: true, data: foodMenu });
    } catch (error) {
        console.log('err :', error);
        // next(err);
        return next(new ErrorResponse(`Failed to fetch Food Menu`, 502));
    }
});
