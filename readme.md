

# Twilio IVR System with Custom Audio and SMS

This Node.js application allows you to create a Twilio-powered Interactive Voice Response (IVR) system. When a call is made to the Twilio number, it plays a personalized audio message stored locally. If the caller presses "1", an SMS is sent to the caller with a personalized interview link.

## Features
- **Play custom audio**: Plays a personalized voice note during the call.
- **Gather user input**: Listens for the caller pressing "1" on their phone.
- **Send SMS**: Sends an interview link via SMS when "1" is pressed.

## Prerequisites
Before running this project, make sure you have:
- Node.js installed
- A Twilio account (with Account SID, Auth Token, and a Twilio phone number)
- An `.env` file with your Twilio credentials

## Getting Started

### 1. Clone the Repository
```bash
git clone <url of repo>
cd <folder-name>
```

### 2. Install Dependencies
Run the following command to install the required packages:
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root of your project and add your Twilio credentials:

```env
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_NUMBER=your_twilio_number
PERSONAL_NUMBER=your_personal_phone_number
```

- `TWILIO_ACCOUNT_SID`: Your Twilio Account SID from the Twilio Console.
- `TWILIO_AUTH_TOKEN`: Your Twilio Auth Token from the Twilio Console.
- `TWILIO_NUMBER`: Your Twilio phone number that will make the call.
- `PERSONAL_NUMBER`: The personal phone number to which the interview link will be sent.

### 4. Place Your Audio File
Place your personalized audio file in the root directory of the project. The file should be named `Fara-interview-audio.mp3`. If you have a different file name, update the file name in `index.js`:

```javascript
response.play(`${req.protocol}://${req.get('host')}/your-audio-file-name.mp3`);
```

### 5. Expose Your Local Server Using ngrok
Twilio needs a publicly accessible URL to access your local server. Use [ngrok](https://ngrok.com/) to expose your local server.

1. Run your Node.js server:
   ```bash
   nodemon index.js
   ```

2. Start ngrok:
   ```bash
   ngrok http 3000
   ```

3. Copy the `https` URL from ngrok and update your Twilio webhook to point to this URL followed by `/ivr`.

### 6. Set Up Your Twilio Webhook
In the Twilio Console, go to your phone number settings and set the **Webhook URL** to your ngrok URL followed by `/ivr`. For example:
```
https://your-ngrok-url.ngrok.io/ivr
```

### 7. Run the Server
Once everything is set up, start the server:
```bash
node index.js
```

Your server will be running on `http://localhost:3000` and exposed via ngrok.

## How It Works
- **Incoming Call**: When a call is made to your Twilio number, the server plays the `Fara-interview-audio.mp3` file.
- **Input Handling**: After the audio message, the server waits for the user to press "1".
- **Send SMS**: If "1" is pressed, the server sends an SMS with a personalized interview link to the user's phone.

## Dependencies
- **Express**: A minimal Node.js web application framework.
- **Twilio**: Node.js SDK for interacting with Twilio's APIs.

## License
This project is licensed under the MIT License.

## Acknowledgments
- [Twilio](https://www.twilio.com/) for providing the APIs used in this project.
- [Ngrok](https://ngrok.com/) for providing an easy way to expose local servers to the public internet.
