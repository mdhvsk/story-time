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
    def insert_picture(story_id, file_name):
    

        try:
            query = f"INSERT INTO pictures(name, story_id) VALUES (%s, %s)"
            info = (str(file_name), story_id)
            new_id = MySQLConnection('story_time').insert_into_table(query, info)
            return new_id
        except Exception as e:
            print(f"Error uploading image: {e}")
            return jsonify({'message': 'Error with upload'}), 400

    @staticmethod
    def get_image(story_id):
        try:
            query = f"Select name from pictures where story_id=%s"
            image = MySQLConnection('story_time').select_from_table(query, story_id)
            return image
        except Exception as e:
            print(f"Error uploading image: {e}")
            return jsonify({'message': 'Error with upload'}), 400