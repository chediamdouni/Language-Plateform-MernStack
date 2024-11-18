const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
// Configuration du transporteur SMTP
const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.SECURE,
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendVerificationEmail = async (user) => {
  const verificationToken = jwt.sign(
    { userId: user._id },
    process.env.VERIFICATION_TOKEN_SECRET,
    { expiresIn: "1h" }
  );

  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  const verificationUrl = `${baseUrl}/verify-email?token=${verificationToken}`;

  const mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: "Vérification de votre compte", // Sujet
    text: `Bonjour ${user.username},\n\nVeuillez vérifier votre compte en cliquant sur le lien suivant : ${verificationUrl}\n\nCe lien expirera dans 1 heure.\n\nMerci!`, // corps du texte brut
    html: `<p>Bonjour ${user.username},</p>
           <p>Veuillez vérifier votre compte en cliquant sur le lien suivant : 
           <a href="${verificationUrl}">Vérifier mon compte</a></p>
           <p>Ce lien expirera dans 1 heure.</p>
           <p>Merci!</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email de vérification envoyé avec succès!");
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
  }
};


const sendSubscriptionConfirmationEmail = async (user, planDetails) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: "Confirmation de votre abonnement",
    text: `Bonjour ${user.username},\n\nMerci d'avoir souscrit à notre service. Voici les détails de votre abonnement :\n\nPlan : ${planDetails.name}\nPrix : ${planDetails.price}${planDetails.period}\nDurée : ${planDetails.duration}\n\nNous espérons que vous apprécierez votre expérience d'apprentissage avec nous.\n\nCordialement,\nL'équipe LearnUp`,
    html: `
      <h2>Bonjour ${user.username},</h2>
      <p>Merci d'avoir souscrit à notre service. Voici les détails de votre abonnement :</p>
      <ul>
        <li><strong>Plan :</strong> ${planDetails.name}</li>
        <li><strong>Prix :</strong> ${planDetails.price}${planDetails.period}</li>
        <li><strong>Durée :</strong> ${planDetails.duration}</li>
      </ul>
      <p>Nous espérons que vous apprécierez votre expérience d'apprentissage avec nous.</p>
      <p>Cordialement,<br>L'équipe LearnUp</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email de confirmation d'abonnement envoyé avec succès!");
  } catch (error) {
    console.error(
      "Erreur lors de l'envoi de l'email de confirmation d'abonnement:",
      error
    );
  }
};

module.exports = { sendVerificationEmail, sendSubscriptionConfirmationEmail };
