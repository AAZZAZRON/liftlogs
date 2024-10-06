from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from extensions import db


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
db.init_app(app)

@app.route("/exercise/<int:ex_id>", methods=["GET"])
def get_exercise(ex_id):
    return "got exercise!", 200

@app.route("/exercise/create", methods=["PUT"])
def create_exercise():
    print(request.form)
    return {"name": request.form['name']}, 201


if __name__ == "__main__":
    app.run(debug=True)