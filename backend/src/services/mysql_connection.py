import pymysql
import os
from dotenv import load_dotenv

load_dotenv()


class MySQLConnection:
    def __init__(self, db):
        self.connection = pymysql.connect(host='db',
                                          user=os.getenv('MYSQL_USER'),
                                          password=os.getenv('MYSQL_PASSWORD'),
                                          database=db,
                                          cursorclass=pymysql.cursors.DictCursor
                                          )

    def health_check(self):
        if self.connection and self.connection.open:
            print('Successfully connected to the database.')
        else:
            print('The database connection is closed.')

    def close(self):
        self.db.close()
        print("Closed connection")

    def insert_into_table(self, query, data=None):
        self.health_check()
        try:
            with self.connection.cursor() as cursor:
                cursor.execute(query, data)
                self.connection.commit()
                print("Running Query:", query)
                print(cursor.lastrowid)
                result = {'id': cursor.lastrowid}
                return result
        except pymysql.MySQLError as e:
            print("Something went wrong", e)
            return None
        finally:
            self.connection.close()

    def select_from_table(self, query, data=None):
        self.health_check()
        try:
            with self.connection.cursor() as cursor:
                cursor.execute(query, data)
                self.connection.commit()
                content = cursor.fetchall()
                return content
        except pymysql.MySQLError as e:
            print("Something went wrong", e)
            return None
        finally:
            self.connection.close()

    def delete_or_edit_on_table(self, query, data=None):
        self.health_check()
        try:
            with self.connection.cursor() as cursor:
                cursor.execute(query, data)
                self.connection.commit()
                return 'Successful'
        except pymysql.MySQLError as e:
            print("Something went wrong", e)
            return None
        finally:
            self.connection.close()



def connect_to_mysql(db):
    return MySQLConnection(db)
