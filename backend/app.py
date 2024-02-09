from flask import Flask, Response, jsonify
from backend.src.controllers.openai_controller import api_blueprint
from flask_cors import CORS

app = Flask(__name__)

app.register_blueprint(api_blueprint, url_prefix='/api')

CORS(app)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
