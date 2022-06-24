const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  phone_number: {
    type: Number,
    required: true,
    min: 6,
    max: 255,
    unique: true,
  },
  relationship_status: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  location : {
     type : Point ,
    coordinates : [ 124.6682391 , -17.8978304]
  }
});

module.exports = mongoose.model('Contact', contactSchema);