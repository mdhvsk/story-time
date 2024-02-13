import os

from backend.src.services.mysql_connection import MySQLConnection
import base64
import boto3
from datetime import datetime
from flask import jsonify
class Picture:

    def __init__(self, data):
        self.name = data['name']
        self.story_id = data['story_id']

    @staticmethod
    def insert_picture(base64_string, story_id, story_component):
        image_data = base64.b64decode(base64_string)
        file_name = story_component + str(datetime.now()).replace(" ", "")


        try:
            query = f"INSERT INTO pictures(name, data, story_id) VALUES (%s, %s, %s)"
            info = (file_name, image_data, story_id)
            new_id = MySQLConnection('story_time').insert_into_table(query, info)
            return new_id
        except Exception as e:
            print(f"Error uploading image: {e}")
            return jsonify({'message': 'Error with upload'}), 400



