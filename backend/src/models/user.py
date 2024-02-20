from flask import flash

from backend.src.services.mysql_connection import MySQLConnection
import re
EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')



class User:

    def __init__(self, data):
        self.id = data['id']
        self.first_name = data['first_name']
        self.last_name = data['last_name']
        self.email = data['email']
        self.password = data['password']

    @staticmethod
    def insert_user(first_name: str, last_name: str, email: str, password: str):
        print("Made it to register user ")
        query = f"INSERT INTO users(first_name, last_name, email, password) VALUES (%s, %s, %s, %s)"
        info = (first_name, last_name, email, password)
        new_id = MySQLConnection('story_time').insert_into_table(query, info)
        return new_id

    @staticmethod
    def get_user_by_email(data):
        query = f"SELECT * FROM users WHERE email=%s"
        email = (data["email"])
        user_info = MySQLConnection('story_time').select_from_table(query, email)
        return user_info


    @staticmethod
    def validate_registration_form(data):
        is_valid = True
        if len(data['first_name']) < 2 or data['first_name'].isalpha() == False:
            flash(
                "First name must contain only letters with at least 2 letters", 'register')
            is_valid = False
        if len(data['last_name']) < 2 or data['last_name'].isalpha() == False:
            flash("Last name must contain only letters with at least 2 letters", 'register')
            is_valid = False
        if not EMAIL_REGEX.match(data['email']):
            flash('Invalid email address', 'register')
            is_valid = False
        result = User.get_user_by_email(data)
        if len(result) != 0:
            flash("This email already has an account, use login!", 'register')
            is_valid = False
        if len(data['password']) <6:
            flash("Password must be at least 8 characters", 'register')
            is_valid = False
        return is_valid


