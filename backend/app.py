from flask import Flask, request, jsonify

app = Flask(__name__)

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

if __name__ == '__main__':
    # Run on all interfaces to allow mobile devices to reach it
    app.run(host='0.0.0.0', port=5000, debug=True)