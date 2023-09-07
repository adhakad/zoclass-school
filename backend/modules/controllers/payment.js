const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('../models/payment');

const razorpay = new Razorpay({
  key_id: "rzp_test_ARoUa9Hxw3scSz",
  key_secret: "TVIz565DG7GB1kzF4Q8uVayK",
});

let CreatePayment = async (req, res) => {
  const { amount, currency } = req.body;
  console.log(amount)

  const paymentData = {
    amount: amount, // Razorpay amount is in paisa (1 INR = 100 paisa)
    currency,
  };

  try {
    const order = await razorpay.orders.create(paymentData);
    
    // Save order ID and amount in your database
    const payment = new Payment({
      orderId: order.id,
      amount,
    });

    await payment.save();

    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ error: 'Payment creation failed' });
  }
};

let ValidatePayment = async (req, res) => {
  try {
    const paymentId = req.body.payment_id; // Get the payment_id from the request
    const orderId = req.body.order_id;
    const signature = req.body.signature;
    const secretKey = 'TVIz565DG7GB1kzF4Q8uVayK'

    // Create a HMAC-SHA256 hash of orderId and Razorpay Secret
    const body = orderId + "|" + paymentId;

  const expectedSignature = crypto
    .createHmac("sha256", secretKey)
    .update(body.toString())
    .digest("hex");
    // Compare the calculated signature with the received signature
    if (expectedSignature === signature) {
      console.log("abc")
      // Signature is valid, mark the payment as successful in MongoDB
      const updatedPayment = await Payment.findOneAndUpdate(
        { orderId: orderId },
        { status: 'success',}, // Store the payment_id in the database
        { new: true }
      );

      if (updatedPayment) {
        // Payment status updated successfully
        res.status(200).json({ success: true, message: 'Payment successfully validated.' });
      } else {
        // Payment document not found or update failed
        res.status(400).json({ success: false, message: 'Failed to update payment status.' });
      }
    } else {
      // Signature is invalid, reject the payment
      res.status(400).json({ success: false, message: 'Payment validation failed.' });
    }
  } catch (error) {
    console.error('Error validating payment:', error);
    res.status(500).json({ success: false, message: 'Error validating payment.' });
  }
}
module.exports = {
    CreatePayment,
    ValidatePayment
}