from flask import Flask, request, jsonify
from flask_restful import Api, Resource
# https://www.youtube.com/watch?v=GMppyAPbLYk

app = Flask(__name__)

@app.route("/", methods=["GET"])
def home():
    return "Hello, World!"




if __name__ == "__main__":
    app.run(debug=True)

