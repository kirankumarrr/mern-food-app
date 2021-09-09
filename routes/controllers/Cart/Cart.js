const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const Restaurants = require('../../../models/Restaurants');
const asyncHandler = require('../../../middlewares/async');
const ErrorResponse = require('../../utils/errorResponse');
const FoodMenu = require('../../../models/FoodMenu');
const User = require('../../../models/User');
/*
 * @route : POST /api/restaurant
 * @desc : POST Single Restaurant
 * @access : PRIVATE
 */
exports.createCart = asyncHandler(async (req, res, next) => {
    const errors = expressValidator.validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ErrorResponse(`Errors on Add to cart`, 502));
    } else {
        try {
            if (req.user.role === 'owner') {
                return next(
                    new ErrorResponse(`Owner cannot add food to cart`, 403)
                );
            }
            const foodReceivedId = req.params.id;
            const foundFoodItem = await FoodMenu.findById(foodReceivedId);
            if (!foundFoodItem) {
                return next(new ErrorResponse(`Food doesn't exist`, 403));
            } else {
                if (
                    req.user.cart &&
                    req.user.cart.items &&
                    req.user.cart.items.length > 0 &&
                    req.user.cart.restaurantId.toString() &&
                    req.user.cart.restaurantId.toString() !==
                        foundFoodItem.restaurantId.toString()
                ) {
                    return next(
                        new ErrorResponse(
                            `You are not allowed to add items from multiple restaurant`,
                            403
                        )
                    );
                }

                const addToCart = await req.user.addToCart(foundFoodItem);

                if (!addToCart) {
                    return next(
                        new ErrorResponse(`Failed to add food to cart`, 403)
                    );
                }
                const createFoodItem = addToCart.cart.items.filter(
                    (record) =>
                        record.foodId._id.toString() ===
                        foundFoodItem._id.toString()
                );
                const newData = createFoodItem[0];
                newData.foodId = foundFoodItem._id.toString();
                res.status(200).json({
                    success: true,
                    message: 'Food added to cart',
                    data: newData
                });
            }
        } catch (err) {
            console.log('err :', err);
            return next(new ErrorResponse(`Failed to add food to cart`, 502));
        }
    }
});

/*
 * @route : GET /api/restaurant
 * @desc : Get Restaurants
 * @access : PRIVATE
 */
exports.fetchCart = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        return next(new ErrorResponse(`Cart Items failed to fetch`, 404));
    }
    res.status(200).json({ success: true, data: user.cart.items });
});

exports.deleteFromCart = asyncHandler(async (req, res, next) => {
    const errors = expressValidator.validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ErrorResponse(`Errors on Add to cart`, 502));
    } else {
        try {
            if (req.user.role === 'owner') {
                return next(new ErrorResponse(`Owner cannot delete cart`, 403));
            }
            const foodReceivedId = req.params.id;
            const foundFoodItem = await FoodMenu.findById(foodReceivedId);
            if (!foundFoodItem) {
                return next(new ErrorResponse(`Food doesn't exist`, 403));
            } else {
                const addToCart = await req.user.removeFromCart(
                    foundFoodItem._id
                );
                if (!addToCart) {
                    return next(
                        new ErrorResponse(
                            `Failed to delete item from cart`,
                            403
                        )
                    );
                }
                res.status(200).json({
                    success: true,
                    message: 'Deleted food from cart'
                });
            }
        } catch (err) {
            console.log('err :', err);
            return next(
                new ErrorResponse(`Failed to deleted food from cart`, 502)
            );
        }
    }
});

exports.clearCompleteCart = asyncHandler(async (req, res, next) => {
    const errors = expressValidator.validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ErrorResponse(`Errors on clear cart`, 502));
    } else {
        try {
            if (req.user.role === 'owner') {
                return next(new ErrorResponse(`Owner cannot clear cart`, 403));
            }
            const isCartCleared = await req.user.clearCart();
            if (!isCartCleared) {
                return next(
                    new ErrorResponse(`Failed to clear items from cart`, 403)
                );
            }
            res.status(200).json({
                success: true,
                message: 'cart Cleared'
            });
        } catch (err) {
            console.log('err :', err);
            return next(
                new ErrorResponse(`Failed to clear items from cart`, 502)
            );
        }
    }
});
