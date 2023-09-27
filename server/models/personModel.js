const mongoose = require("mongoose");

// Define the user schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  _userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// Add a virtual property for HATEOAS links
personSchema.virtual('_links').get(function() {
  return {
    self: { href: `/v1/profiles/${this._userid}/people/${this._id}` },
    user: { href: `/v1/profiles/${this._userid}` },
    update: { href: `/v1/profiles/${this._userid}/people/${this._id}`, method: "PATCH" },
    delete: { href: `/v1/profiles/${this._userid}/people/${this._id}`, method: "DELETE" }
  };
});

// Ensure virtual fields are serialised.
personSchema.set('toJSON', {
  virtuals: true
});

// Create and export the model
module.exports = mongoose.model("Person", personSchema);
