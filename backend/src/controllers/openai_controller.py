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
    response = openai_object.generate_story_from_prompt(grade_level, age, topic, words, details)
    return jsonify(response)


@api_blueprint.route('/generate/summary+story', methods=['POST'])
def generate_summary_endpoint():
    data = request.json
    prompt = data.get('prompt')
    response = openai_object.generate_summary_and_title_from_story(prompt)

    return response


@api_blueprint.route('/generate/definition', methods=['POST'])
def generate_definition_endpoint():
    data = request.json
    # prompt = data.get('prompt')
    # response = openai_object.generate_definition_from_word(prompt)
    # print("Got response")
    WORD = data.get('word')
    API_KEY = os.environ.get('WEBSTER_SD2_API_KEY')

    url = f"https://www.dictionaryapi.com/api/v3/references/sd2/json/{WORD}?key={API_KEY}"
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raises an HTTPError for bad responses
        data = response.json()
        print(data)
        # Ensure data[0] has 'shortdef' key to avoid KeyError
        result = {"word": WORD}
        if 'shortdef' in data[0] and data[0]['shortdef']:
            definition = data[0]['shortdef'][0]
            result['definition'] = definition
        else:
            print("No definition found or the data structure is different.")
        if 'fl' in data[0] and data[0]['fl']:
            figureOfSpeech = data[0]['fl']
            result['figure'] = figureOfSpeech
        return result
        print(result)
    except requests.RequestException as error:
        return jsonify({'message': 'Something went wrong!', 'error': str(e)}), 500


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
