const express = require('express');
const router = express.Router();

const { protect } = require('../../middlewares/auth');
const {
  createOrder,
  fetchOrders,
  updateStatus,
  fetchOrder,
} = require('../controllers/Order/Order');
const OrderValidator = require('../../validationMiddelware/order');
router.use(protect);
// router.delete('/clearAll', clearCompleteCart);
router.get('/', fetchOrders);
router.post('/', OrderValidator(), createOrder);
router.put('/:orderId/:status', updateStatus);
router.get('/:id', fetchOrder);
// router.get('/cart', fetchCart);

module.exports = router;
