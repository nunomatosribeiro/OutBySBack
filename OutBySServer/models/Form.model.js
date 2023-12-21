const { Schema, model } = require("mongoose");


const formsSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email:{
        type: String,
        required: true
      },
      message:{
        type: String,
        required: false
      },
      product:{
        type: String,
        required: false
      },
      tours: {
        type: Boolean,
        required: false
      },
    activities: {
      type: Boolean,
      required: false
    },
    food: {
      type: Boolean,
      required: false
    },
    other: {
      type: Boolean,
      required: false
    },
    }
);

const Forms = model("Forms", formsSchema);

module.exports = Forms;