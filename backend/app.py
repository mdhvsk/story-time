from flask import Flask, Response, jsonify
from backend.src.controllers.openai_controller import api_blueprint
from backend.src.controllers.mysql_controller import db_blueprint
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

database_user = os.getenv('MYSQL_USER')
database_password = os.getenv('MYSQL_PASSWORD')

app.config['MYSQL_HOST'] = database_user
app.config['MYSQL_PASSWORD'] = database_password
app.config['MYSQL_DB'] = 'story_time'

app.register_blueprint(api_blueprint, url_prefix='/api')
app.register_blueprint(db_blueprint, url_prefix='/db')

CORS(app)



if __name__ == '__main__':
    app.run(debug=True, port=5000)
