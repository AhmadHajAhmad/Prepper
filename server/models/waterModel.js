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


// Create and export the model
module.exports = mongoose.model('Water', waterSchema);

