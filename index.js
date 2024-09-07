import express from "express";
import bodyParser from "body-parser";
import twilio from "twilio";
import VoiceResponse from "twilio/lib/twiml/VoiceResponse.js";
import { fileURLToPath } from "url";
import path from "path";

import dotenv from "dotenv";
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const __filename = fileURLToPath(import.meta.url);

// Get the directory path
const __dirname = path.dirname(__filename);

const client = twilio(accountSid, authToken);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));

// Route to handle incoming calls
app.post("/ivr", (req, res) => {
  const response = new VoiceResponse();

  // Play your personalized audio message
  response.play(
    `${req.protocol}://${req.get("host")}/Fara-interview-audio.mp3`
  );

  // Add gathering input (for button press)
  response.gather({
    numDigits: 1,
    action: "/handle-input",
    method: "POST",
  });

  res.type("text/xml");
  res.send(response.toString());
});

// Handle the user's input (button press)
app.post("/handle-input", (req, res) => {
  const digit = req.body.Digits;
  const response = new VoiceResponse();

  if (digit === "1") {
    // Send interview link via SMS
    client.messages
      .create({
        body: "Here is your personalized interview link: https://v.personaliz.ai/?id=9b697c1a&uid=fe141702f66c760d85ab&mode=test",
        to: `${process.env.PERSONAL_NUMBER}`,
      from: `${process.env.TWILIO_NUMBER}`,
      })
      .then((message) => console.log(message.sid));

    response.say(
      "The interview link has been sent to your phone, thank you have a great day."
    );
  } else {
    response.say("You did not press 1. Goodbye.");
  }

  res.type("text/xml");
  res.send(response.toString());
});

// Make the outbound call
app.post("/make-call", (req, res) => {
  client.calls
    .create({
      url: "https://5f33-223-223-149-161.ngrok-free.app/ivr",
      to: `${process.env.PERSONAL_NUMBER}`,
      from: `${process.env.TWILIO_NUMBER}`,
    })
    .then((call) => console.log(call.sid))
    .catch((err) => console.error(err));

  res.send("Call initiated,you will get call shortly");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
