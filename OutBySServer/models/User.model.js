const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    isAdmin: { type: Boolean, default: false },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      select: false, 
    },
    profileImage: {
      type: String,
    },
    favorites:[
      {
        type: Schema.Types.ObjectId,
        ref: 'Posts',
      },
    ],
    role: {
      type: String,
      enum: ['user', 'admin'], 
      default: 'user', 
    },
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
