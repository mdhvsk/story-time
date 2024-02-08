from flask import Flask, request, jsonify, Blueprint

from backend.src.services.openai_manager import OpenAIManager

api_blueprint = Blueprint('api', __name__)


@api_blueprint.route('/test', methods=['GET'])
def test_endpoint():
    return jsonify({'message': 'OK'}), 200


@api_blueprint.route('/open-ai', methods=['POST'])
def openai_endpoint():
    openai_object = OpenAIManager()

    data = request.json

    method = data.get('method')
    prompt = data.get('prompt')
    print(prompt)

    # Prompt -> Story
    if method == 'generate_story_from_prompt':
        response = openai_object.generate_story_from_prompt(prompt)

    # Story -> Summary
    elif method == 'generate_summary_from_story':
        response = openai_object.generate_summary_from_story(prompt)

    # Definition -> Word
    elif method == 'generate_definition_from_word':
        response = openai_object.generate_summary_from_story(prompt)
    elif method == 'generate_image_from_summary':
        response = openai_object.generate_image_from_summary(prompt)

    else:
        return jsonify({'error': 'Method not found'}), 404
    return response
