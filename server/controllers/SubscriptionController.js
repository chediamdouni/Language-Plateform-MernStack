const User = require("../models/User");
const MeetingDetails = require("../models/MeetingDetails");

const updateSubscription = async (req, res) => {
  try {
    const { userId, subscriptionType, startDate, endDate } = req.body;

    const weeklyAllowance = {
      "30min": 30,
      "1hour": 60,
      "1.5hours": 90,
      "2hours": 120,
    }[subscriptionType];

    await User.findByIdAndUpdate(userId, {
      subscription: {
        type: subscriptionType,
        startDate,
        endDate,
        weeklyAllowance,
        usedTime: 0,
      },
    });

    res.status(200).json({ message: "Subscription updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating subscription" });
  }
};

const checkSubscriptionStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user || !user.subscription) {
      return res.status(404).json({ error: "User or subscription not found" });
    }

    const now = new Date();
    const subscriptionActive =
      now >= user.subscription.startDate && now <= user.subscription.endDate;
    const remainingTime =
      user.subscription.weeklyAllowance - user.subscription.usedTime;

    res.status(200).json({
      subscriptionActive,
      remainingTime,
      subscriptionType: user.subscription.type,
      endDate: user.subscription.endDate,
    });
  } catch (error) {
    res.status(500).json({ error: "Error checking subscription status" });
  }
};

const updateUsedTime = async (req, res) => {
  try {
    const { userId, meetingId } = req.params;
    const meeting = await MeetingDetails.findOne({ meeting_id: meetingId });

    if (!meeting) {
      return res.status(404).json({ error: "Meeting not found" });
    }

    const durationInMinutes =
      (meeting.end_time - meeting.start_time) / (1000 * 60);

    await User.findByIdAndUpdate(userId, {
      $inc: { "subscription.usedTime": durationInMinutes },
    });

    res.status(200).json({ message: "Used time updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating used time" });
  }
};
//  handle successful payments and update the user's subscription:
const handleWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { userId, planType, subscriptionDuration } = session.metadata;

    const startDate = new Date();
    let endDate = new Date(startDate);

    switch (subscriptionDuration) {
      case "Mensuel":
        endDate.setMonth(endDate.getMonth() + 1);
        break;
      case "Trimestriel":
        endDate.setMonth(endDate.getMonth() + 3);
        break;
      case "Annuel":
        endDate.setFullYear(endDate.getFullYear() + 1);
        break;
    }

    await User.findByIdAndUpdate(userId, {
      subscription: {
        type: planType,
        startDate,
        endDate,
        weeklyAllowance: {
          "30min": 30,
          "1hour": 60,
          "1.5hours": 90,
          "2hours": 120,
        }[planType],
        usedTime: 0,
      },
    });
  }
  res.json({ received: true });
};


module.exports = {
  updateUsedTime,
  checkSubscriptionStatus,
  updateSubscription,
  handleWebhook,
};
