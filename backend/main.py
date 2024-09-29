from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from sqlalchemy.orm import DeclarativeBase
from extensions import db
from models import ExerciseModel, EntryModel


# initialize flask app
app = Flask(__name__)
api = Api(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
db.init_app(app)


# # create db table
# with app.app_context():
#     db.create_all()



entry_fields = {
    "id": fields.Integer,
    "exercise_id": fields.Integer,
}


exercise_put_args = reqparse.RequestParser()
exercise_put_args.add_argument("name", type=str, help="Name of exercise is required", required=True)

exercise_fields = {
    "id": fields.Integer,
    "name": fields.String,
    "logs": fields.List(fields.Nested(entry_fields))
}


class Exercise(Resource):
    @marshal_with(exercise_fields)
    def get(self, exercise_id):
        result = ExerciseModel.query.filter_by(id=exercise_id).first()
        return result
    
    def put(self, exercise_id):
        exercise = ExerciseModel(name="Push Up")
        db.session.add(exercise)
        db.session.commit()


        entry1 = EntryModel(exercise_id=exercise.id, text="Set 1: 10 reps")
        entry2 = EntryModel(exercise_id=exercise.id, text="Set 2: 15 reps")

        db.session.add(entry1)
        db.session.add(entry2)
        db.session.commit()

        # Access entries through the exercise
        exercise_entries = exercise.logs
        print(exercise_entries)
        return exercise, 201
        # args = exercise_put_args.parse_args()
        # exercise = ExerciseModel(name=args['name'])
        # db.session.add(exercise)
        # db.session.commit()
        # return exercise, 201


api.add_resource(Exercise, "/exercise/<int:exercise_id>")

if __name__ == "__main__":
    app.run(debug=True)
