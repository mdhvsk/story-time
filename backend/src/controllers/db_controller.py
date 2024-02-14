import bcrypt
from flask import Blueprint, jsonify, request, session
from backend.src.services.mysql_connection import MySQLConnection
from backend.src.models.user import User
from backend.src.models.story import Story
from backend.src.models.picture import Picture
from backend.src.models.note import Note
from flask_cors import CORS

db_blueprint = Blueprint('db', __name__, url_prefix='/db')

CORS(db_blueprint)

@db_blueprint.route('/test/db', methods=['GET'])
def test_db_endpoint():
    if MySQLConnection('story_time').health_check():
        return jsonify(), 200
    else:
        return jsonify({'message': 'ERROR'}), 400


# Users start
@db_blueprint.route('/user/insert', methods=['POST'])
def register_user_endpoint():
    print("Registration")
    data = request.json
    if not User.validate_registration_form(data):
        return jsonify({'message': 'Invalid form input'}), 400
    hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
    hashed_password_str = hashed_password.decode('utf-8')
    print(hashed_password_str)
    new_id = User.insert_user(data['first_name'], data['last_name'], data['email'], hashed_password_str)
    response = jsonify(new_id)
    response.headers.add("Access-Control-Allow-Origin", "*")
    print(response)
    return response


@db_blueprint.route('/user/select', methods=['GET'])
def get_user_endpoint():
    data = request.json
    response = User.get_user_by_email(data)
    print(response)
    if not response:
        return jsonify({'message': 'ERROR Email not in db'}), 400
    response = response[0]
    if not bcrypt.checkpw(data['password'].encode('utf-8'), response['password'].encode('utf-8')):
        return jsonify({'message': 'ERROR password wrong'}), 400

    return response


# Users End

# Stories Start
@db_blueprint.route('/insert/story', methods=['POST'])
def insert_story_endpoint():
    data = request.json
    new_id = Story.insert_story(data['title'], data['summary'], data['text'], data['user_id'])
    return new_id


@db_blueprint.route('/select/stories', methods=['GET'])
def get_stories_endpoint():
    data = request.json
    response = Story.get_stories(data)
    return response


# Stories End

# Notes start
@db_blueprint.route('/insert/note', methods=['POST'])
def insert_note_endpoint():
    data = request.json
    response = Note.insert_note(data)
    return response

@db_blueprint.route('/select/notes', methods=['GET'])
def get_notes_endpoint():
    data = request.json
    response = Note.get_notes(data)
    return response


# Pictures Start
@db_blueprint.route('/insert/picture', methods=['POST'])
def insert_picture_endpoint():
    data = request.json
    new_id = Picture.insert_picture(data)
    return new_id


