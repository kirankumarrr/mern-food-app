const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const Restaurants = require('../../../models/Restaurants');
const asyncHandler = require('../../../middlewares/async');
const ErrorResponse = require('../../utils/errorResponse');
const FoodMenu = require('../../../models/FoodMenu');
const User = require('../../../models/User');
const Order = require('../../../models/Order');
const OrderStatus = require('../../../models/OrderStatus');
/*
 * @route : POST /api/restaurant
 * @desc : POST Single Restaurant
 * @access : PRIVATE
 */
exports.createOrder = asyncHandler(async (req, res, next) => {
  const errors = expressValidator.validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ErrorResponse(`Errors on Order Creation`, 502));
  } else {
    try {
      if (req.user.role === 'owner') {
        return next(new ErrorResponse(`Owner cannot create order`, 403));
      }
      const getRestaurantDetails = await Restaurants.findById(
        req.body.restaurantId
      );
      if (!getRestaurantDetails) {
        return next(new ErrorResponse(`Restaurant not found`, 403));
      }
      const finalObject = {
        restaurantOwner: getRestaurantDetails.user,
        restaurantId: getRestaurantDetails._id.toString(),
        restaurantName: getRestaurantDetails.name,
        orderMenu: req.body.orderMenu,
        user: {
          email: req.user.email,
          role: req.user.role,
          userId: req.user._id,
        },
        totalAmount: req.body.totalAmount,
      };
      const createdOrder = await Order.create(finalObject);
      if (!createdOrder) {
        return next(new ErrorResponse(`Failed to create order`, 403));
      }
      const statusUpdated = await OrderStatus.create({
        order: createdOrder,
        status: [
          {
            currentState: 'placed',
            isCompleted: true,
            updatedAt: new Date(),
          },
        ],
      });
      if (!statusUpdated) {
        return next(new ErrorResponse(`Failed to update Status`, 403));
      }
      res.status(200).json({
        success: true,
        data: createdOrder,
      });
    } catch (err) {
      return next(new ErrorResponse(`Failed to add food to cart`, 502));
    }
  }
});

/*
 * @route : GET /api/restaurant
 * @desc : Get FoodMenu
 * @access : PRIVATE
 */
exports.fetchOrder = asyncHandler(async (req, res, next) => {
  try {
    const findOrder = await Order.findById(req.params.id);
    const findOrderStatus = await OrderStatus.findOne({
      order: req.params.id,
    });
    if (!findOrder) {
      return next(
        new ErrorResponse(`Order not found with id ${req.params.id}`, 404)
      );
    }
    const final = {
      ...findOrder._doc,
      detailStatus: findOrderStatus._doc,
    };
    res.status(200).json({ success: true, data: final });
  } catch (error) {
    return next(new ErrorResponse(`Failed to fetch Order`, 502));
  }
});
/*
 * @route : GET /api/restaurant
 * @desc : Get FoodMenu
 * @access : PRIVATE
 */
exports.fetchOrders = asyncHandler(async (req, res, next) => {
  try {
    let findOrder;
    if (req.user.role === 'owner') {
      findOrder = await Order.find({
        'restaurantOwner.userId': req.user._id,
      });
    } else {
      findOrder = await Order.find({
        'user.userId': req.user._id,
      });
    }

    if (!findOrder) {
      return next(new ErrorResponse(`Order not found`, 404));
    }
    res.status(200).json({ success: true, data: findOrder });
  } catch (error) {
    return next(new ErrorResponse(`Failed to fetch Order`, 502));
  }
});

/*
 * @route : POST /api/restaurant
 * @desc : POST Single Restaurant
 * @access : PRIVATE
 */
exports.updateStatus = asyncHandler(async (req, res, next) => {
  const orderId = req.params.orderId;
  const status = req.params.status;
  const errors = expressValidator.validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ErrorResponse(`Errors on Order Creation`, 502));
  } else {
    try {
      if (
        req.user.role === 'owner' &&
        (status === 'cancel' || status === 'received')
      ) {
        return next(
          new ErrorResponse(`Owner cannot update this status: ${status}`, 403)
        );
      }
      const getOrder = await Order.findById(orderId);

      const getStatusRecord = await OrderStatus.findOne({
        order: orderId,
      });
      getStatusRecord.status[status] = {
        isCompleted: true,
        updatedAt: new Date(),
      };
      const keyUpdatedAt = `status.${status}.updatedAt`;
      const keyCompleted = `status.${status}.isCompleted`;

      const createNewState = Object.assign([], getStatusRecord.status);
      createNewState.push({
        currentState: status,
        isCompleted: true,
        updatedAt: new Date(),
      });

      const statusUpdated = await OrderStatus.updateOne(
        { order: orderId },
        {
          $set: {
            status: createNewState,
          },
        }
      );
      if (!statusUpdated) {
        return next(new ErrorResponse(`Failed to update Status`, 403));
      }
      if (!getOrder) {
        return next(new ErrorResponse(`Order not found`, 403));
      }
      getOrder.status = status;
      const updated = await getOrder.save();
      if (!updated) {
        return next(new ErrorResponse(`Failed to update status`, 403));
      }
      res.status(200).json({
        success: true,
        data: updated,
      });
    } catch (err) {
      return next(new ErrorResponse(`Failed to update status`, 502));
    }
  }
});
