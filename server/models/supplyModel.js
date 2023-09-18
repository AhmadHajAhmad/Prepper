const mongoose = require('mongoose');

// Define the water schema
const supplySchema = new mongoose.Schema({
  itemname: {
    type: String,
    required: true,
  },
  instock: {
    type: Boolean,
    required: true,
  },
  _userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

// Add a virtual property for HATEOAS links
supplySchema.virtual('_links').get(function() {
  return {
    self: { href: `/v1/profile/${this._userid}/supplies/${this._id}` },
    user: { href: `/v1/profile/${this._userid}` },
    update: { href: `/v1/profile/${this._userid}/supplies/${this._id}`, method: "PATCH" },
    delete: { href: `/v1/profile/${this._userid}/supplies/${this._id}`, method: "DELETE" }
  };
});

// Ensure virtual fields are serialised.
supplySchema.set('toJSON', {
  virtuals: true
});

// Create and export the model
module.exports = mongoose.model("Supply", supplySchema);