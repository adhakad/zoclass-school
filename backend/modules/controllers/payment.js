const Razorpay = require('razorpay');
const crypto = require('crypto');
const { DateTime } = require('luxon');
const FeesCollectionModel = require('../models/fees-collection');
const FeesStructureModel = require('../models/fees-structure');
const Payment = require('../models/payment');

const razorpay = new Razorpay({
  key_id: "rzp_test_ARoUa9Hxw3scSz",
  key_secret: "TVIz565DG7GB1kzF4Q8uVayK",
});

let CreatePayment = async (req, res) => {
  const { studentId, name, cls, rollNumber, feesInstallment, feesAmount, currency } = req.body;
  const paymentData = {
    amount: feesAmount * 100,
    currency: currency,
  };
  try {
    const order = await razorpay.orders.create(paymentData);
    const payment = new Payment({
      studentId: studentId,
      name: name,
      orderId: order.id,
      class: cls,
      rollNumber: rollNumber,
      feesInstallment: feesInstallment,
      feesAmount: feesAmount,
      currency,
    });
    await payment.save();
    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ error: 'Payment creation failed' });
  }
};

let ValidatePayment = async (req, res) => {
  try {
    const paymentId = req.body.payment_id;
    const orderId = req.body.order_id;
    const signature = req.body.signature;
    const secretKey = 'TVIz565DG7GB1kzF4Q8uVayK'
    const body = orderId + "|" + paymentId;
    const expectedSignature = crypto
      .createHmac("sha256", secretKey)
      .update(body.toString())
      .digest("hex");
    if (expectedSignature === signature) {
      const updatedPayment = await Payment.findOneAndUpdate(
        { orderId: orderId },
        { status: 'success', },
        { new: true }
      );
      if (updatedPayment) {
        const rollNumber = updatedPayment.rollNumber;
        const className = updatedPayment.class;
        let feesAmount = updatedPayment.feesAmount;
        let feesInstallment = updatedPayment.feesInstallment;
        let receiptNo = Math.floor(Math.random() * 899999 + 100000);
        const currentDateIst = DateTime.now().setZone('Asia/Kolkata');
        const istDateTimeString = currentDateIst.toFormat('dd-MM-yyyy hh:mm:ss a');
        const checkFeesCollection = await FeesCollectionModel.findOne({ rollNumber: rollNumber, class: className });
        const id = checkFeesCollection._id;
        const totalFees = checkFeesCollection.totalFees;
        const installments = checkFeesCollection.installment;
        const totalInstallment = installments.reduce((acc, installment) => {
          const value = Object.values(installment)[0];
          return acc + value;
        }, 0);
        const paidFees = totalInstallment + feesAmount;
        const dueFees = totalFees - paidFees;
        const updatedDocument = await FeesCollectionModel.findOneAndUpdate(
          { _id: id, 'installment': { $elemMatch: { [feesInstallment]: { $exists: true } } }, 'receipt': { $elemMatch: { [feesInstallment]: { $exists: true } } }, 'paymentDate': { $elemMatch: { [feesInstallment]: { $exists: true } } } },
          { $set: { [`installment.$.${feesInstallment}`]: feesAmount, [`receipt.$.${feesInstallment}`]: receiptNo, [`paymentDate.$.${feesInstallment}`]: istDateTimeString, paidFees: paidFees, dueFees: dueFees } },
          { new: true }
        );
        console.log("abc")
        return res.status(200).json({ success: true, message: 'Payment successfully validated.' });
      }
      if (!updatedPayment) {
        return res.status(400).json({ success: false, message: 'Failed to update payment status.' });
      }
      return res.status(400).json({ success: false, message: 'Payment validation failed.' });
    }
  } catch (error) {
    console.error('Error validating payment:', error);
    return res.status(500).json({ success: false, message: 'Error validating payment.' });
  }
}
module.exports = {
  CreatePayment,
  ValidatePayment
}