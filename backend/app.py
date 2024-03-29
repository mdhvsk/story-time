import os

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from flask import Flask, Response, jsonify
from backend.src.controllers.openai_controller import api_blueprint
from backend.src.controllers.db_controller import db_blueprint
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

SECRET_KEY = os.getenv('SECRET_KEY') or 'shhh this is a secret'
print(SECRET_KEY)
app.config['SECRETKEY'] = SECRET_KEY

CORS(app, origins=["http://localhost:3000"])
app.register_blueprint(api_blueprint)
app.register_blueprint(db_blueprint)

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5000)
