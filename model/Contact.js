const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({

  full_name: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  relationship_status: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  // location : {
  //    type : Point ,
  //   coordinates : [ 124.6682391 , -17.8978304]
  // }
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
});

module.exports = mongoose.model('Contact', contactSchema);