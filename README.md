# women-safety-app
Safe vibe is a AI powered mobile application designed to enhance women's safety in public area by enabling quick emergency alerts and smart behavioral monitoring. The app offers real time panic alert triggering through shake motion and instant services. this project aims to provide a silent,fast and intelligent way for women to seek help in panic  
# 🛡️ Women Safety App -  SOS System and AI Ready

A React Native + Flask-based application that empowers women's safety by detecting threats, capturing location, recording audio, and sending SOS alerts to authorities or guardians.

![logo](./assets/logo.png)

---

## 🔍 Overview

This app allows users to:
- 📍 Detect location during emergency.
- 📳 Send SOS alerts via **shake gesture** or **button tap**.
- 🎙️ Record and send audio to backend (for future AI-based analysis).
- 🔊 Play alarm sounds as a distress signal.
- 🧠 (Planned) Integrate AI to detect harassment or suspicious sounds.

---

## 💡 Features

| Feature                    | Description                                                |
|---------------------------|------------------------------------------------------------|
| 🔘 SOS Button              | Tap to trigger alert, location & audio send               |
| 📳 Shake Detection        | Shake the phone to trigger emergency alert                |
| 🌍 Location Access        | Gets current GPS coordinates                              |
| 🔊 Alert Sound            | Plays beep to gather attention                            |
| 📤 Audio Upload           | Records ambient sound and sends to backend for analysis   |
| 🔐 Backend                | Flask server receives and logs location & audio files     |

---

## 🛠️ Tech Stack

- **Frontend:** React Native with Expo
- **Backend:** Python Flask
- **Sensors & Location:** Expo Sensors, Expo Location
- **Audio:** Expo Audio
- **File Upload:** Multipart audio upload via `fetch`
- **Deployment Mode:** Development (for demo)

---

## 🔧 1. Backend Setup (Flask)

### 🐍 Step 1: Create Virtual Environment
```bash
cd backend
python -m venv venv
###🧪 Step 2: Activate Virtual Environment
Windows
venv\Scripts\activate
Mac/Linux
source venv/bin/activate
### 📦 Step 3: Install Required Packages
pip install Flask flask-cors soundfile
### ▶️ Step 4: Run the Flask Server
python app.py
Server will start
## 📱 2. Frontend Setup (Expo App)

### Step 1 : Install Expo CLI
npm install -g expo-cli
### Step 2 : Start the App
cd frontend
npm install
npx expo start

🌐 3. Connect App to Backend
Update your App.js file:
Replace <YOUR-IP> with your system’s local IP address.

📌 Find your IP:

Windows: ipconfig
Mac/Linux: ifconfig

✅ Make sure:
Phone and PC are on the same WiFi
Backend is running
No firewall blocking port 5000

