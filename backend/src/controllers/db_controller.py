import logging
import bcrypt
import jwt
from flask import Blueprint, jsonify, request, session, current_app

from backend.src.services.auth_middleware import token_required
from backend.src.services.mysql_connection import MySQLConnection
from backend.src.models.user import User
from backend.src.models.story import Story
from backend.src.models.picture import Picture
from backend.src.models.note import Note
from backend.src.models.tag import Tag

from flask_cors import CORS
import boto3 
from botocore.exceptions import ClientError

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
    try:
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
    except Exception as e:
        return jsonify({'message': 'Something went wrong!', 'error': str(e)}), 500


@db_blueprint.route('/user/login', methods=['POST'])
def get_user_endpoint():
    try:
        data = request.json
        if not data:
            return jsonify({'message': 'ERROR Bad request'}), 400
        user = User.get_user_by_email(data)
        print(user)
        if not user:
            return jsonify({'message': 'ERROR Email not in db'}), 400
        if not bcrypt.checkpw(data['password'].encode('utf-8'), user['password'].encode('utf-8')):
            return jsonify({'message': 'ERROR password wrong'}), 400
        return user
        # try:
        #     # token should expire after 24 hrs
        #     user["token"] = jwt.encode(
        #         {"user_id": user["id"]},
        #         current_app.config["SECRET_KEY"],
        #         algorithm="HS256"
        #     )
        #     return {
        #         "message": "Successfully fetched auth token",
        #         "data": user
        #     }
        # except Exception as e:
        #     return jsonify({"error": "Something went wrong with jwt", "message": str(e)}), 500
    except Exception as e:
        return jsonify({'message': 'Something went wrong with data', 'error': str(e)}), 500





# Users End

# Stories Start
@db_blueprint.route('/insert/story', methods=['POST'])
def insert_story_endpoint():


    data = request.json
    paragraphs = data['text']
    notes = data['notes']
    print("*******PARAGRAPHS********")
    try: 
        story_id = Story.insert_story(data['title'], data['summary'], data['user_id'])

        for note in notes:
    
            Note.insert_note(note['word'], note['definition'], note['type'], data['user_id'], story_id['id'])
        print("Finished notes")
        for index, paragraph in enumerate(paragraphs):
            Story.insert_story_text(story_id['id'], paragraph, index)
        
        Picture.insert_picture(story_id['id'], data['file_name'])
        return jsonify({"id": story_id['id']}), 200
    

    except Exception as e:
        return jsonify({'message': 'Something went wrong with submission', 'error': str(e)}), 500


@db_blueprint.route('/get/stories', methods=['POST'])
def get_stories_endpoint():
    data = request.json
    user_id = data['user_id']
    response = Story.get_stories_per_user(user_id)
    return response

@db_blueprint.route('/get/story', methods=['POST'])
def get_story_endpoint():
    data = request.json
    id = data['id']
    response = Story.get_story(id)
    return response


@db_blueprint.route('/get/all/content', methods=['POST'])
def get_all_story_content_endpoint():
    data = request.json
    response = {}
    response_story = Story.get_story(data['id'])
    response['story'] = response_story
    response_text = Story.get_story_text(data['id'])
    response['text'] = response_text
    response_notes = Note.get_story_notes(data['id'])
    response['notes'] = response_notes
    response_picture = Picture.get_image(data['id'])
    response['image_name'] = response_picture

    return response


@db_blueprint.route('/get/stories/explore', methods=['POST'])
def get_all_story_for_explore_endpoint():
    response = Story.get_all_stories()
    return response


@db_blueprint.route('/get/story/count', methods=['GET'])
def get_story_count_endpoint():
    response = Story.get_story_count()
    return response

# Stories End

# Notes start
@db_blueprint.route('/insert/note', methods=['POST'])
def insert_note_endpoint():
    data = request.json
    response = Note.insert_note(data)
    return response

@db_blueprint.route('/get/notes', methods=['POST'])
def get_notes_endpoint():
    data = request.json
    user_id = data['user_id']
    response = Note.get_notes(user_id)
    return response


# Pictures Start
@db_blueprint.route('/insert/picture', methods=['POST'])
def insert_picture_endpoint():
    data = request.json
    new_id = Picture.insert_picture(data)
    return new_id


@db_blueprint.route('/insert/tag', methods=['POST'])
def insert_tag_endpoint():
    data = request.json
    tag = Tag()
    new_id = tag.insert_tag(data['tag_name'], data['tag_type'])
    return jsonify({"id": new_id}), 200


@db_blueprint.route('/insert/story-tag', methods=['POST'])
def insert_story_tag_endpoint():
    data = request.json
    new_id = Tag.insert_story_tag(data['story_id'], data['tag_id'])
    return jsonify({"id": new_id}), 200

@db_blueprint.route('/select/tags', methods=['POST'])
def select_tags_endpoint():
    data = request.json
    print("Tags")
    print(data)
    tags = Tag.select_tags_per_story(data['story_id'])
    return tags

