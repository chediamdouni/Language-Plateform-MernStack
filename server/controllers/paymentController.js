const User = require("../models/User.js");
const { sendSubscriptionConfirmationEmail } = require("../utils/SendEmail.js");
const stripe = require("../utils/Stripe.js");

const createPaymentIntent = async (req, res) => {
  try {
    console.log("donné entré ", req.body);
    const { amount, currency } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de la création du paiement.",
    });
  }
};

const SendConfirmationPayment = async (req, res) => {
  try {
    const { userId, planDetails } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await sendSubscriptionConfirmationEmail(user, planDetails);
    res.status(200).json({ message: "Confirmation email sent successfully" });
  } catch (error) {
    res.status(500).json({
      error:
        "Une erreur est survenue lors de l'envoie de l'email de confirmation paiement '.",
    });
  }
};
const createCheckoutSession = async (req, res) => {
  try {
    const { planType, selectedPlan, totalPrice, userId } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `${planType} - ${selectedPlan.name}`,
            },
            unit_amount: totalPrice * 100, // Stripe utilise les centimes
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3000/apprenant/profile`,
      cancel_url: `http://localhost:3000/pricing`,
      metadata: {
        userId,
        planType,
        subscriptionDuration: selectedPlan.name,
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({
      error:
        "Une erreur est survenue lors de la création de la session de paiement.",
    });
  }
};
module.exports = {
  createPaymentIntent,
  SendConfirmationPayment,
  createCheckoutSession,
};
