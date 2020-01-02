const Store = require('../models/Store');

// @desc Get all stores
// @route GET /api/v1/stores
// @access public

exports.getStores = async (req, res, next) => {
  try {
    const stores = await Store.find();
    return res.status(200).json({
      success: true,
      count: stores.length,
      data: stores
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
