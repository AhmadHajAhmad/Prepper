const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false, // Sets isAdmin to false by default
  },
});

// Add a virtual property for HATEOAS links
userSchema.virtual("_links").get(function () {
  return {
    self: { href: `/v1/profiles/${this._id}` },
    update: { href: `/v1/profiles/${this._id}`, method: "PATCH" },
    delete: { href: `/v1/profiles/${this._id}`, method: "DELETE" },
  };
});

// Ensure virtual fields are serialised.
userSchema.set("toJSON", {
  virtuals: true,
});

// Create and export the model
module.exports = mongoose.model("User", userSchema);
