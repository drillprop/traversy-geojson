const { Schema, model } = require('mongoose');
const geocoder = require('../utils/geocoder');

const StoreSchema = new Schema({
  storeId: {
    type: String,
    required: [true, 'Please add store id'],
    unique: true,
    trim: true,
    maxlength: [10, 'Store ID must be less than 10 chars ']
  },
  address: {
    type: String,
    required: [true, 'Please add an address']
  },
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'] // 'location.type' must be 'Point'
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    formattedAddress: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

//Geocode & create location
// pre method is some kind of mongoose middleware
StoreSchema.pre('save', async function(next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress
  };

  // do not save address in DB
  this.address = undefined;
  next();
});

module.exports = model('Store', StoreSchema);
