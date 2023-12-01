const { Schema, model } = require("mongoose");


const postsSchema = new Schema(
  {
    allMedia: [{
      type: String,
      required: false,
    }],
    category: {
        type: String,
        enum: ['Tailor made','Food', 'Activities', 'Tours' ],
        default: 'activities',
        required: true,
        ref: 'Posts',
      },
    title: {
      type: String,
      required: true,
    },
    description: {
        type: String,
        required: false
      },
      price: {
        type: Number,
        required: false,
        default: 0,
        min: 0,
      },
      location: {
        type: String,
      },
      fullDescription:{
        type: String,
        required: true
      },
      info: [
        {
        duration:{
          type: String,
          required: false
        },
        language:{
        type: String,
        required: false
      },
      cancellation:{
        type: String,
        required: false
      },
      other:{
        type: String,
        required: false
      }
    }
  ],
      included: [
        {
          included:{
        type: String,
        required: false
      },
      notIncluded:{
        type: String,
        required: false
      }
      }
    ],
      reviews: [
        {
          rating: Number,
          comment: String,
          user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
          },
        },
      ],
      favorites:[
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Posts = model("Posts", postsSchema);

module.exports = Posts;