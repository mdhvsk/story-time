import logging

from backend.src.services.mysql_connection import MySQLConnection


class Story:

    def __init__(self, data):
        self.title = data['title']
        self.summary = data['summary']
        self.text = data['text']

    @staticmethod
    def insert_story(title: str, summary: str, user_id: int):
        print("Made it to insert story")
        query = f"INSERT INTO stories(title, summary, user_id) VALUES (%s, %s, %s)"
        info = (title, summary, user_id)
        new_id = MySQLConnection('story_time').insert_into_table(query, info)
        return new_id

    @staticmethod
    def get_stories(user_id):
        logging.debug("This is a debug message")
        query = f"SELECT * From stories WHERE user_id=%s"
        story_info = MySQLConnection('story_time').select_from_table(query, user_id)
        return story_info
    
    @staticmethod
    def get_stories_per_user(user_id):
        query = f"select stories.id, stories.title, stories.summary, pictures.name from stories left join pictures on stories.id = pictures.story_id WHERE stories.user_id=%s"
        story_info = MySQLConnection('story_time').select_from_table(query, user_id)
        return story_info


    @staticmethod
    def insert_story_text(story_id: int, text_context: str, sequence: int):
        print("made it to insert story text")
        query = f"INSERT INTO story_text(story_id, text_content, sequence) VALUES (%s, %s, %s)"
        info = (story_id, text_context, sequence)
        new_id = MySQLConnection('story_time').insert_into_table(query, info)
        return new_id
    
    @staticmethod
    def get_story(id):
        logging.debug("This is a debug message")
        query = f"SELECT * From stories WHERE id=%s"
        story_info = MySQLConnection('story_time').select_from_table(query, id)
        return story_info[0]

    @staticmethod
    def get_story_text(id):
        query = f"select text_content, sequence from story_text where story_id=%s order by sequence;"
        story_info = MySQLConnection('story_time').select_from_table(query, id)
        return story_info
    

    @staticmethod
    def get_all_stories():
        query = "select stories.id, stories.title, stories.summary, pictures.name from stories left join pictures on stories.id = pictures.story_id"
        story_info = MySQLConnection('story_time').select_from_table(query)
        return story_info

    @staticmethod
    def get_filter_stories():
        get_stories = "select stories.id, stories.title, stories.summary, pictures.name from stories left join pictures on stories.id = pictures.story_id"
    

    @staticmethod
    def get_story_count():
        query = "Select Count(*) from stories"
        story_count = MySQLConnection('story_time').select_from_table(query)
        return story_count
