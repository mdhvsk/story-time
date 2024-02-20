import base64

import openai
from flask import jsonify
from openai import OpenAI


class OpenAIManager:

    def __init__(self):
        self.client = OpenAI()
        self.gpt_model = "gpt-3.5-turbo-1106"
        self.dall_e_model = "dall-e-3"

    def generate_story_from_prompt(self, grade_level: str, age: str, topic: str, length: str, details: str):
        response = self.client.chat.completions.create(
            model=self.gpt_model,
            response_format={"type": "json_object"},
            messages=[
                {"role": "system", "content": f"You are a helpful assistant designed to write stories. The following "
                                              f"story will be written at the reading level, vocabulary, and sentence "
                                              f"structure of a {grade_level} grader but the themes will be for a {age} year old. "
                                              "The output will be in JSON. Given a prompt, you will return back a "
                                              "title, one sentence summary of the story, and story. All responses "
                                              "will be formatted as followed: {'title': 'generated title', 'summary': 'one sentence summary', "
                                              "'story': 'generated story'}"},
                {"role": "user", "content": f"Write a {topic} story that includes {details}. The story should be {length} pages long. The story should be at least 5 paragraphs. Make sure the passage gets a Coleman Liau Index of {grade_level[0]}"}
            ]
        )
        return response.choices[0].message.content

    def generate_story_from_prompt_test(self, grade_level: str, age: str, topic: str, length: str, details: str):
        response = self.client.chat.completions.create(
            model=self.gpt_model,
            messages=[
                {"role": "system", "content": f"You are a helpful assistant designed to write stories. The following "
                                              f"story will be written at the reading level, vocabulary, and sentence "
                                              f"structure of a {grade_level} grader but the themes will be for a {age} year old. Do not provide a title."},
                {"role": "user", "content": f"Write a {topic} story that includes {details}. The story should be {length} words long. The story should be at least 5 paragraphs. Separate each paragraph by a line.  Make sure the passage gets a Coleman Liau Index of {grade_level[0]} "}
            ],
            temperature=1
        )
        return response.choices[0].message.content

    def generate_summary_from_story(self, prompt: str):
        response = self.client.chat.completions.create(
            model=self.gpt_model,
            response_format={"type": "json_object"},
            messages=[
                {"role": "system", "content": "You are a helpful assistant designed to output summaries of stories in "
                                              "JSON. All responses will be formatted as followed: {'summary': 'generated summary'"},
                {"role": "user", "content": f'Give a one sentence summary of the following story: {prompt}'}
            ],
            temperature=1
        )
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
        print("Made it to generate")
        try:
            response = self.client.images.generate(
                model=self.dall_e_model,
                n=1,
                size="1024x1024",
                prompt= f'Make an animated picture of the following prompt: {prompt}',
                quality="standard",
                response_format="b64_json"
            )
            base64_string = response.data[0].b64_json
            return base64_string
        except openai.OpenAIError as e:
            print("Made it to error")
            print(e.http_status)
            print(e.error)


