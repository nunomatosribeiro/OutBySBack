const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const cartSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the user who owns the cart
    },
    items: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Post', // Reference to the post or item being added to the cart
        },
        quantity: {
          type: Number,
          default: 1, // You can set the default quantity
        },
      },
    ],
  },
  {
     
    timestamps: true
  }
);

const Cart = model("Cart", cartSchema);

module.exports = Cart;
