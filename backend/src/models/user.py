from backend.src.services.mysql_connection import MySQLConnection


class User:

    def __init__(self, data):
        self.id = data['id']
        self.first_name = data['first_name']
        self.last_name = data['last_name']
        self.email = data['email']
        self.password = data['password']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']

    @staticmethod
    def register_user(data):
        print("Made it to register")

        query = f"INSERT INTO users(first_name, last_name, email, password) VALUES (%s, %s, %s, %s)"
        info = (data["first_name"], data["last_name"], data["email"], data["password"])
        newID = MySQLConnection('story_time').query_db(query, info)
        return newID

    @staticmethod
    def getUserByEmail(data):
        query = f"SELECT FROM users WHERE id=%s"
        id = (data["id"])
        userInfo = MySQLConnection('story_time').select_from_db(query, id)
        return userInfo
