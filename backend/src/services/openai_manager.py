import openai
from openai import OpenAI


class OpenAIManager:

    def __init__(self):
        self.client = OpenAI()
        self.gpt_model = "gpt-3.5-turbo-1106"
        self.dall_e_model = "dall-e-3"

    def generate_story_from_prompt(self, prompt):
        response = self.client.chat.completions.create(
            model=self.gpt_model,
            response_format={"type": "json_object"},
            messages=[
                {"role": "system", "content": "You are a helpful assistant designed to output JSON. All responses   "
                                              "will be formatted as followed: {'title': 'generated title', 'story':     "
                                              "'generated story'}"},
                {"role": "user", "content": "Write a short story about a basketball player"}
            ]
        )
        return response.choices[0].message.content

    def generate_summary_from_story(self, prompt):
        response = self.client.chat.completions.create(
            model=self.gpt_model,
            response_format={"type": "json_object"},
            messages=[
                {"role": "system", "content": "You are a helpful assistant designed to output summaries of stories in "
                                              "JSON. All responses will be formatted as followed: {'summary': 'generated summary'"},
                {"role": "user", "content": f'Give a one sentence summary of the following story: {prompt}'}
            ]
        )
        return response.choices[0].message.content

    def generate_definition_from_word(self, prompt):
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

    def generate_image_from_summary(self, prompt):
        try:
            response = self.client.images.generate(
                model={self.dall_e_model},
                n=1,
                size="1024x1024",
                prompt=f'Make an animated picture of the following prompt: {prompt}',
                quality="standard"

            )
            print (response)
            return response
        except openai.OpenAIError as e:
            print(e.http_status)
            print(e.error)


