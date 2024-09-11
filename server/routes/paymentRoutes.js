const express = require("express");
const {
  createPaymentIntent,
  SendConfirmationPayment,
  createCheckoutSession,
} = require("../controllers/paymentController");

const router = express.Router();

router.post("/create-payment-intent", createPaymentIntent);
router.post("/send-confirmation", SendConfirmationPayment);
router.post("/create-checkout-session", createCheckoutSession);

module.exports = router;
