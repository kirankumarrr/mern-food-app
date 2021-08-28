const express = require('express');
const router = express.Router();

const { protect } = require('../../middlewares/auth');
const {
  createCart,
  fetchCart,
  deleteFromCart,
  clearCompleteCart,
} = require('../controllers/Cart/Cart');
router.use(protect);
router.delete('/clearAll', clearCompleteCart);
router.get('/', fetchCart);
router.post('/:id', createCart);
router.delete('/:id', deleteFromCart);
// router.get('/cart', fetchCart);

module.exports = router;
