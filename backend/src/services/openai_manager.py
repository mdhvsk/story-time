import base64
import logging
import os
import secrets
import string

import openai
from flask import jsonify
from openai import OpenAI
import boto3
import boto3 
from botocore.exceptions import ClientError

class OpenAIManager:

    def __init__(self):
        self.client = OpenAI()
        OpenAI.api_key = os.getenv('OPENAI_API_KEY')
        self.gpt_model = "gpt-3.5-turbo-1106"
        self.dall_e_model = "dall-e-3"

    def generate_story_from_prompt(self, grade_level: str, age: str, topic: str, length: str, details: str):
        response = self.client.chat.completions.create(
            model=self.gpt_model,
            messages=[
                {"role": "system", "content": f"You are a helpful assistant designed to write stories. The following "
                 f"story will be written at the reading level, vocabulary, and sentence "
                 f"structure of a {grade_level} grader but the themes will be for a {age} year old. Do not provide a title."},
                {"role": "user",
                    "content": f"Write a {topic} story that includes {details}. The story should be {length} words long. The story should be at least 5 paragraphs. Please format it in multiple paragraphs using the string \\n\n .Make sure the passage gets a Coleman Liau Index of {grade_level[0]} "}
            ],
            temperature=1
        )
        text_output = response.choices[0].message.content.strip()

        # Split the output into paragraphs
        paragraphs = text_output.split('\n\n')
        paragraphs = [paragraph.strip() for paragraph in paragraphs]

        # Output the paragraphs array
        print(paragraphs)
        return paragraphs

    def generate_story_from_prompt_test(self, grade_level: str, age: str, topic: str, length: str, details: str):
        response = self.client.chat.completions.create(
            model=self.gpt_model,
            messages=[
                {"role": "system", "content": f"You are a helpful assistant designed to write stories. The following "
                 f"story will be written at the reading level, vocabulary, and sentence "
                 f"structure of a {grade_level} grader but the themes will be for a {age} year old. Do not provide a title."},
                {"role": "user",
                    "content": f"Write a {topic} story that includes {details}. The story should be {length} words long. The story should be at least 5 paragraphs. Please format it in multiple paragraphs using the string \\n\n .Make sure the passage gets a Coleman Liau Index of {grade_level[0]} "}
            ],
            temperature=1
        )
        text_output = response.choices[0].message.content.strip()

        # Split the output into paragraphs
        paragraphs = text_output.split('\n\n')
        paragraphs = [paragraph.strip() for paragraph in paragraphs]

        # Output the paragraphs array
        print(paragraphs)

        return response.choices[0].message.content

    def generate_summary_and_title_from_story(self, prompt: str):
        response = self.client.chat.completions.create(
            model=self.gpt_model,
            response_format={"type": "json_object"},
            messages=[
                {"role": "system", "content": "You are a helpful assistant designed to output summaries and titles of stories in "
                 "JSON. All responses will be formatted as followed: {'title': 'generated title', 'summary': 'generated summary'}"},
                {"role": "user", "content": f'Give a one sentence summary and a title for the following story: {prompt}'}
            ],
            temperature=1
        )
        print("SUMARY AND TITLE")
        print(response.choices[0].message.content)
        return response.choices[0].message.content

    def generate_definition_from_word(self, prompt: str):
        response = self.client.chat.completions.create(
            model=self.gpt_model,
            response_format={"type": "json_object"},
            messages=[
                {"role": "system", "content": "You are a helpful assistant designed to output definitions of words in "
                                              "JSON. All responses will be formatted as followed: {'definition': 'generated definition', 'part':     "
                                              "'generated parts of speech'}"},
                {"role": "user",
                 "content": f'Given the word: {prompt} give a one sentence definition and the part of speech of the word'}
            ]
        )
        return response.choices[0].message.content

    def generate_image_from_text(self, prompt: str):
        response = self.client.images.generate(
            model="dall-e-3",
            n=1,
            size="1024x1024",
            prompt=f'Make an animated picture of the following story excerpt:{prompt}. Make sure there are no words in the picture',
            quality="standard",
            response_format="b64_json"

        )

        base64_string = response.data[0].b64_json
        image_data = base64.b64decode(base64_string)

        print("base 64 string type: " + str(type(base64_string)))
        print("image data string type: " + str(type(image_data)))
        characters = string.ascii_letters + string.digits
        secure_filename = ''.join(secrets.choice(characters) for i in range(20)) + '.jpeg'
        file_name = secure_filename
        with open(file_name, 'wb') as image_file:
            image_file.write(image_data)

        s3 = boto3.client('s3')
        
        try:
            response = s3.upload_file(file_name, 'story-time-mdhvsk', file_name)
            print("Image uploaded successfully")
            print(response)
            os.remove(file_name)
        except Exception as e:
            print(f"Error uploading image: {e}")

        return file_name

