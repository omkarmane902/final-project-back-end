const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    const {
      items, totalPrice, packingCharge, discount, finalPrice,
      tableNumber, paymentScreenshot, status, timestamp
    } = req.body;

    const newOrder = new Order({
      items,
      totalPrice,
      packingCharge,
      discount,
      finalPrice,
      tableNumber,
      paymentScreenshot, // base64 string
      status: status || 'Pending',
      timestamp: timestamp || new Date()
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order saved', order: newOrder });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save order', error: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ timestamp: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Order deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Delete failed', error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.status(200).json({ message: 'Status updated', order: updated });
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error: error.message });
  }
};
