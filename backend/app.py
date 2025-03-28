from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from dotenv import load_dotenv
import os

# Load environment variables from .env
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# DeepSeek API Configuration
API_KEY = os.getenv('DEEPSEEK_API_KEY')
API_URL = os.getenv('DEEPSEEK_API_URL')

@app.route('/', methods=['GET'])
def home():
    """Home route to check if the API is running"""
    return jsonify({"message": "AI Finance Assistant API is running"})


@app.route('/chat', methods=['POST'])
def chat():
    """Chat endpoint to handle user queries and get DeepSeek API responses"""
    try:
        data = request.get_json()
        
        # Check if message is provided in the request
        if not data or 'message' not in data:
            return jsonify({"error": "No message provided"}), 400

        user_input = data['message']

        # Prepare payload for DeepSeek API
        payload = {
            "model": "deepseek-chat",
            "messages": [
                {
                    "role": "system",
                    "content": "You are a helpful financial assistant. Provide clear, concise, and accurate financial advice."
                },
                {
                    "role": "user",
                    "content": user_input
                }
            ],
            "temperature": 0.7,
            "max_tokens": 2000
        }

        # Define headers with API key
        headers = {
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json",
        }

        # Make API request to DeepSeek
        response = requests.post(API_URL, json=payload, headers=headers)

        # Check if API response is successful
        if response.status_code == 200:
            result = response.json()
            
            # Extract and return bot response if API returned valid data
            if "choices" in result and len(result["choices"]) > 0:
                bot_response = result['choices'][0]['message']['content']
                return jsonify({"reply": bot_response})
            else:
                return jsonify({"error": "Invalid API response format"}), 500
        else:
            return jsonify({"error": f"API Error: {response.status_code}", "details": response.text}), response.status_code

    except Exception as e:
        # Handle any unexpected errors
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
