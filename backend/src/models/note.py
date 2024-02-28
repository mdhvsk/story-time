from backend.src.services.mysql_connection import MySQLConnection


class Note:

    def __init__(self, data):
        self.word = data['word']
        self.definition = data['definition']
        self.type = data['type']

    @staticmethod
    def insert_note(word: str, definition: str, type: str, user_id: int, story_id: int):
        query = f"INSERT INTO notes(word, definition, type, user_id, story_id) VALUES (%s, %s, %s, %s, %s)"
        info = (word, definition, type, user_id, story_id)
        new_id = MySQLConnection('story_time').insert_into_table(query, info)
        return new_id

    @staticmethod
    def get_notes(user_id):
        query = f"SELECT * From notes WHERE user_id=%s"
        user_id = (user_id)
        story_info = MySQLConnection('story_time').select_from_table(query, user_id)
        return story_info


    @staticmethod
    def get_story_notes(id):
        query = f"SELECT * From notes WHERE story_id=%s"
        story_info = MySQLConnection('story_time').select_from_table(query, id)
        return story_info
    
    @staticmethod
    def delete_note(id):
        query = f"Delete from notes where id=%s"
        info = (id)
        is_deleted = MySQLConnection('story_time').delete_or_edit_on_table(query, info)
        return is_deleted




