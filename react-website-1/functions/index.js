/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 

const {onCall} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");
const functions = require("firebase-functions");

admin.initializeApp();

// Get API key from Firebase config
const SENDGRID_API_KEY = functions.config().sendgrid.key;
sgMail.setApiKey(SENDGRID_API_KEY);
*/
// Remove the email sending functionality
// exports.sendVerificationEmail = onCall(async (request) => {
//   const {email, code} = request.data;

//   const msg = {
//     to: email,
//     from: "j.lazala31@gmail.com", // Replace with your verified sender
//     subject: "Verify your BiteMark Account",
//     html: `
//             <div style="font-family: Arial, sans-serif; padding: 20px;">
//                 <h2>Verify Your Email Address</h2>
//                 <p>Thank you for signing up!</p>
//                 <p>Use the following code to verify your email address:</p>
//                 <div 
//                     style="background-color: #f4f4f4; padding: 10px;
//                     margin: 20px 0; 
//                     text-align: center;">
//                     <h1 style="letter-spacing: 5px; color: #333;">${code}</h1>
//                 </div>
//                 <p>This code will expire in 15 minutes.</p>
//                 <p>If you didn't request this verification, please ignore.</p>
//             </div>
//         `,
//   };

//   try {
//     await sgMail.send(msg);
//     return {success: true};
//   } catch (error) {
//     console.error("Error sending email:", error);
//     throw new Error("Error sending email");
//   }
// });
