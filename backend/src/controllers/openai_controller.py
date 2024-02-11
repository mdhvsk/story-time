import os

from flask import request, jsonify, Blueprint
import requests
from backend.src.models.openai_manager import OpenAIManager
from backend.src.services.mysql_connection import MySQLConnection

api_blueprint = Blueprint('api', __name__)

openai_object = OpenAIManager()


@api_blueprint.route('/test', methods=['GET'])
def test_endpoint():
    return jsonify({'message': 'OK'}), 200


@api_blueprint.route('/test/db', methods=['GET'])
def test_db_endpoint():
    if MySQLConnection('story_time').health_check():
        return jsonify(), 200
    else:
        return jsonify({'message': 'ERROR'}), 400


@api_blueprint.route('/generate/story', methods=['POST'])
def generate_story_endpoint():
    data = request.json
    prompt = data.get('prompt')
    response = openai_object.generate_story_from_prompt(prompt)
    return response


@api_blueprint.route('/generate/summary', methods=['POST'])
def generate_summary_endpoint():
    data = request.json
    prompt = data.get('prompt')
    response = openai_object.generate_summary_from_story(prompt)
    return response


@api_blueprint.route('/generate/definition', methods=['POST'])
def generate_definition_endpoint():
    data = request.json
    prompt = data.get('prompt')
    response = openai_object.generate_definition_from_word(prompt)
    return response


@api_blueprint.route('/generate/image', methods=['POST'])
def generate_image_endpoint():
    data = request.json
    prompt = data.get('prompt')
    response = openai_object.generate_image_from_summary(prompt)
    return response


@api_blueprint.route('/readability', methods=['POST'])
def readability_endpoint():
    print("Readability called")

    data = request.json
    query = data.get('text')

    rapidapi_key = os.getenv('RAPIDAPI_KEY')

    url = "https://ipeirotis-readability-metrics.p.rapidapi.com/getReadabilityMetrics"
    headers = {
        "X-RapidAPI-Key": {rapidapi_key},
        "X-RapidAPI-Host": "ipeirotis-readability-metrics.p.rapidapi.com"
    }
    response = requests.post(url, headers=headers, params=query)

    return response.json()
