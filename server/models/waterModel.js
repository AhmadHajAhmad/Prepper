const mongoose = require('mongoose');

// Define the water schema
const waterSchema = new mongoose.Schema({

  waterqty: {
    type: Number,
    required: true,
  
  },

  _userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'User',
  }
});

// Add a virtual property for HATEOAS links
waterSchema.virtual('_links').get(function() {
  return {
    self: { href: `/v1/profiles/${this._userid}/water/${this._id}` },
    user: { href: `/v1/profiles/${this._userid}` },
    update: { href: `/v1/profiles/${this._userid}/water/${this._id}`, method: "PATCH" },
    delete: { href: `/v1/profiles/${this._userid}/water/${this._id}`, method: "DELETE" }
  };
});

// Ensure virtual fields are serialised.
waterSchema.set('toJSON', {
  virtuals: true
});


// Create and export the model
module.exports = mongoose.model('Water', waterSchema);

