import pymysql
import os
from dotenv import load_dotenv

load_dotenv()


class MySQLConnection:
    def __init__(self, db):
        self.connection = pymysql.connect(host='localhost',
                                          user=os.getenv('MYSQL_USER'),
                                          password=os.getenv('MYSQL_PASSWORD'),
                                          db=db
                                          )
        self.cursor = self.connection.cursor()

    def health_check(self):
        print(self.connection)
        return self.connection

    def close(self):
        self.cursor.close()
        self.db.close()
        print("Closed connection")

    def query_db(self, query, data=None):
        with self.connection.cursor() as cursor:
            try:
                query = cursor.mogrify(query, data)
                print("Running Query:", query)

                cursor.execute(query, data)
                if query.lower().find("insert") >= 0:
                    # if the query is an insert, return the id of the last row, since that is the row we just added
                    self.connection.commit()
                    return cursor.lastrowid
                elif query.lower().find("select") >= 0:
                    # if the query is a select, return everything that is fetched from the database
                    # the result will be a list of dictionaries
                    result = cursor.fetchall()
                    return result
                else:
                    # if the query is not an insert or a select, such as an update or delete, commit the changes
                    # return nothing
                    print(query)
                    self.connection.commit()
            except Exception as e:
                # in case the query fails
                print("Something went wrong", e)
                return False
            finally:
                # close the connection
                self.connection.close()


# this connectToMySQL function creates an instance of MySQLConnection, which will be used by server.py
# connectToMySQL receives the database we're using and uses it to create an instance of MySQLConnection


def connect_to_mysql(db):
    return MySQLConnection(db)
