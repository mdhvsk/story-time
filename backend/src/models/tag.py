
from backend.src.services.mysql_connection import MySQLConnection

class Tag:

    def __init__(self):
        self.types = ['grade_level', 'topic', 'length', 'age', 'details']
        

    def insert_tag(self, tag_name, tag_type):
        if tag_type not in self.types:
            return False
        info = (tag_name, tag_type)

        query = f"select id from tags where tag_name=%s and tag_type=%s"
        new_id = MySQLConnection('story_time').select_from_table(query, info)

        if new_id:
            return new_id[0]
    
        query = f"INSERT INTO tags(tag_name, tag_type) VALUES (%s, %s)"
        new_id = MySQLConnection('story_time').insert_into_table(query, info)

        return new_id
    
    def insert_story_tag(story_id, tag_id):

        query = f"INSERT INTO story_tags(story_id, tag_id) VALUES (%s, %s)"
        info = (story_id, tag_id)
        new_id = MySQLConnection('story_time').insert_into_table(query, info)

        return new_id
    
    @staticmethod
    def select_tags_per_story(story_id):
        query = f"SELECT tags.tag_name, tags.tag_type from tags join story_tags on tags.id=story_tags.tag_id where story_tags.story_id=%s"
        tags = MySQLConnection('story_time').select_from_table(query, story_id)
        print(tags)
        tags_list = [{'tag_name': tag['tag_name'], 'tag_type': tag['tag_type']} for tag in tags]

        return tags_list










