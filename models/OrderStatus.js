const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderStatusSchema = new Schema({
  status: [
    {
      currentState: {
        type: String,
        require: true,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
        required: true,
      },
      isCompeleted: {
        type: Boolean,
        default: false,
        required: true,
      },
    },
  ],
  order: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('orderStatus', orderStatusSchema);
