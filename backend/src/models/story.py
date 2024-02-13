from backend.src.services.mysql_connection import MySQLConnection


class Story:

    def __init__(self, data):
        self.title = data['title']
        self.summary = data['summary']
        self.text = data['text']

    @staticmethod
    def insert_story(title: str, summary: str, text: str, user_id: int):
        print("Made it to insert story")
        query = f"INSERT INTO stories(title, summary, text, user_id) VALUES (%s, %s, %s, %s)"
        info = (title, summary, text, user_id)
        new_id = MySQLConnection('story_time').insert_into_table(query, info)
        return new_id

    @staticmethod
    def get_stories(data):
        query = f"SELECT * From stories WHERE user_id=%s"
        user_id = (data['user_id'])
        story_info = MySQLConnection('story_time').select_from_table(query, user_id)
        return story_info
