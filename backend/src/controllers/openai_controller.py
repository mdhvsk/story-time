import logging
import os

from flask import request, jsonify, Blueprint
import requests
from backend.src.services.openai_manager import OpenAIManager
from backend.src.models.picture import Picture
from flask_cors import CORS

api_blueprint = Blueprint('api', __name__, url_prefix='/api')

CORS(api_blueprint)

openai_object = OpenAIManager()


@api_blueprint.route('/test', methods=['GET'])
def test_endpoint():
    return jsonify({'message': 'OK'}), 200




@api_blueprint.route('/generate/story', methods=['POST'])
def generate_story_endpoint():
    data = request.json
    grade_level = data.get('grade_level')
    age = data.get('age')
    topic = data.get('topic')
    length = int(data.get('length'))
    length *= 150
    words = str(length)
    details = data.get('details')
    response = openai_object.generate_story_from_prompt_test(grade_level, age, topic, words, details)
    return jsonify(response)


@api_blueprint.route('/generate/summary', methods=['POST'])
def generate_summary_endpoint():
    data = request.json
    prompt = data.get('prompt')
    response = openai_object.generate_summary_from_story(prompt)
    return jsonify(response)


@api_blueprint.route('/generate/definition', methods=['POST'])
def generate_definition_endpoint():
    data = request.json
    prompt = data.get('prompt')
    response = openai_object.generate_definition_from_word(prompt)
    print("Got response")


    return response


@api_blueprint.route('/generate/image', methods=['POST'])
def generate_image_endpoint():
    print("Made it to endpoint")
    data = request.json
    prompt = data.get('prompt')
    story_id = data.get('story_id')
    story_component = data.get('story_component')
    base64_string = openai_object.generate_image_from_text(prompt)
    new_id = Picture.insert_picture(base64_string, story_id, story_component)
    return jsonify(new_id)


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
