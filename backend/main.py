from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from sqlalchemy.orm import DeclarativeBase
from extensions import db
from models import ExerciseModel, EntryModel
from datetime import date


# initialize flask app
app = Flask(__name__)
api = Api(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
db.init_app(app)


# create db table
with app.app_context():
    db.create_all()

set_fields = {
    "reps": fields.Integer,
    "weight": fields.Float,
}

entry_fields = {
    "id": fields.Integer,
    "exercise_id": fields.Integer,
    "text": fields.String,
    "sets": fields.List(fields.Nested(set_fields))
}

exercise_fields = {
    "id": fields.Integer,
    "name": fields.String,
    "logs": fields.List(fields.Nested(entry_fields))
}

entry_get_args = reqparse.RequestParser()
entry_get_args.add_argument("num_entries", type=int, required=False, help="num_entries must be an integer")

entry_put_args = reqparse.RequestParser()
entry_put_args.add_argument("text", type=str, help="Entry body is required", required=False, default=None)
entry_put_args.add_argument("set", type=dict, help="Entry body is required", required=True)


exercise_put_args = reqparse.RequestParser()
exercise_put_args.add_argument("name", type=str, help="Name of exercise is required", required=True)



class Exercise(Resource):
    @marshal_with(exercise_fields)
    def get(self, exercise_id):
        result = ExerciseModel.query.filter_by(id=exercise_id).first()
        
        if not result:
            abort(404, description="Exercise does not exist")

        return result


class ExerciseCreate(Resource):
    @marshal_with(exercise_fields)
    def put(self):
        exercise_args = exercise_put_args.parse_args()

        if ExerciseModel.query.filter_by(name=exercise_args["name"]).first():
            abort(409, description="Exercise already exists")

        exercise = ExerciseModel(name=exercise_args["name"])
        db.session.add(exercise)
        db.session.commit()
        return exercise, 201


class GetEntries(Resource):
    @marshal_with(entry_fields)
    def get(self, exercise_id, num_entries):
        if num_entries == "all":
            results = EntryModel.query.filter_by(exercise_id=exercise_id).all()
        else:
            try:
                num_entries = int(num_entries)
                if num_entries <= 0:
                    raise ValueError
                results = EntryModel.query.filter_by(exercise_id=exercise_id).limit(num_entries).all()
            except ValueError:
                return {"message": "Invalid number of entries"}, 400

        return results, 200


class MakeEntry(Resource):
    @marshal_with(entry_fields)
    def post(self, exercise_id):
        entry_args = entry_put_args.parse_args()    # WHY IS THIS BREAKING
        text = entry_args.get("text")  # Optional text field
        s = entry_args.get("set")

        # if an entry already exists today
        entry = EntryModel.query.filter_by(date=date.today()).first()
        if entry:
            entry.sets.append(s)
        else:
            entry = EntryModel(exercise_id=exercise_id, text=text, sets=[s])
        
        db.session.add(entry)
        db.session.commit()
        return entry, 201




api.add_resource(Exercise, "/exercise/<int:exercise_id>")
api.add_resource(ExerciseCreate, "/exercise/create")
api.add_resource(MakeEntry, "/exercise/<int:exercise_id>/entries/create")
api.add_resource(GetEntries, "/exercise/<int:exercise_id>/entries/<num_entries>")


if __name__ == "__main__":
    app.run(debug=True)

