const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const wishlistSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Password is required.'],
      select: false, // Exclude password field by default
    },
    description: {
        type: String,
        required: [true, 'Password is required.'],
        select: false, // Exclude password field by default
      },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Wishlist = model("Wishlist", wishlistSchema);

module.exports = Wishlist;