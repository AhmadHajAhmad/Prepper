const mongoose = require('mongoose');

// Define the food schema
const foodSchema = new mongoose.Schema({
  foodname: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required : true,
  },
  _userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

// Add a virtual property for HATEOAS links
foodSchema.virtual('_links').get(function() {
  return {
    self: { href: `/v1/profiles/${this._userid}/food/${this._id}` },
    user: { href: `/v1/profiles/${this._userid}` },
    update: { href: `/v1/profiles/${this._userid}/food/${this._id}`, method: "PATCH" },
    delete: { href: `/v1/profiles/${this._userid}/food/${this._id}`, method: "DELETE" }
  };
});

// Ensure virtual fields are serialised.
foodSchema.set('toJSON', {
  virtuals: true
});

// Create and export the model
module.exports = mongoose.model("Food", foodSchema);