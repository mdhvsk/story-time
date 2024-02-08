from flask import Flask, Response, jsonify
from backend.src.controllers.openai_controller import api_blueprint

app = Flask(__name__)


@app.route("/")
def hello_world():
    return Response("Hello", status=200, headers={"Content-Type": "text/plain"})


app.register_blueprint(api_blueprint, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True)
