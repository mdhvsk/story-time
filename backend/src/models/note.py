from backend.src.services.mysql_connection import MySQLConnection


class Note:

    def __init__(self, data):
        self.word = data['word']
        self.definition = data['definition']
        self.type = data['type']

    @staticmethod
    def insert_note(data):
        query = f"INSERT INTO notes(word, definition, type, user_id) VALUES (%s, %s, %s, %s)"
        info = (data["word"], data["definition"], data["type"], data["user_id"])
        new_id = MySQLConnection('story_time').insert_into_table(query, info)
        return new_id

    @staticmethod
    def get_notes(data):
        query = f"SELECT * From notes WHERE user_id=%s"
        user_id = (data['user_id'])
        story_info = MySQLConnection('story_time').select_from_table(query, user_id)
        return story_info

    @staticmethod
    def delete_note(id):
        query = f"Delete from notes where id=%s"
        info = (id)
        is_deleted = MySQLConnection('story_time').delete_or_edit_on_table(query, info)
        return is_deleted




