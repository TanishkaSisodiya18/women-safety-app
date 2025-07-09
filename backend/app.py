from flask import Flask, request, jsonify
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)

UPLOAD_FOLDER = 'upload'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/')
def home():
    return "✅ Flask Backend Running"

@app.route('/sos', methods=['POST'])
def sos():
    data = request.get_json()
    latitude = data.get('latitude')
    longitude = data.get('longitude')

    print(f"📍 SOS Received from Location: {latitude}, {longitude}")

    return jsonify({
        "message": "SOS received successfully!",
        "status": "success"
    })

@app.route('/upload', methods=['POST'])
def upload_audio():
    if 'audio' not in request.files:
        return jsonify({"error": "No audio file provided"}), 400

    audio = request.files['audio']
    filename = secure_filename(audio.filename)
    save_path = os.path.join(UPLOAD_FOLDER, filename)
    audio.save(save_path)

    print(f"🎤 Audio file received and saved at: {save_path}")

    return jsonify({
        "message": "Audio received successfully!",
        "file_path": save_path,
        "status": "success"
    })

if __name__ == '__main__':
    # Run on all interfaces to allow mobile devices to reach it
    app.run(host='0.0.0.0', port=5000, debug=True)
