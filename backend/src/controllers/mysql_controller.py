from flask import Blueprint, jsonify, request
from backend.src.services.mysql_connection import MySQLConnection
from backend.src.models.user import User

db_blueprint = Blueprint('db', __name__)


@db_blueprint.route('/test/db', methods=['GET'])
def test_db_endpoint():
    if MySQLConnection('story_time').health_check():
        return jsonify(), 200
    else:
        return jsonify({'message': 'ERROR'}), 400


@db_blueprint.route('/register/user', methods=['POST'])
def register_user_endpoint():
    data = request.json
    newID = User.register_user(data)
    return newID

@db_blueprint.route('/select/user', methods=['GET'])
def get_user_endpoint():
    data = request.json
    response = User.getUserByEmail(data)
    return response


