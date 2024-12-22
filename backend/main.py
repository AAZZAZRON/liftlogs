from flask import Flask
from flask_restful import Api, Resource, reqparse, abort, marshal_with
from extensions import db
from models import ExerciseModel, EntryModel
from datetime import date
from flask_cors import CORS
from fields import *
from routes.exercise_routes import * 
from routes.workout_routes import * 



# initialize flask app
app = Flask(__name__)
api = Api(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
db.init_app(app)
CORS(app)


# create db table
with app.app_context():
    db.create_all()



# ----- Reqparser Arguments ----- #

entry_get_args = reqparse.RequestParser()
entry_get_args.add_argument("num_entries", type=int, required=False, help="num_entries must be an integer")

entry_post_args = reqparse.RequestParser()
entry_post_args.add_argument("text", type=str, help="Entry body is required", required=False, default=None)
entry_post_args.add_argument("set", type=dict, help="Entry body is required", required=True)



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
        entry_args = entry_post_args.parse_args() 
        text = entry_args.get("text")  # Optional text field
        s = entry_args.get("set")

        print(text, s)

        # if an entry already exists today
        entry = EntryModel.query.filter_by(exercise_id=exercise_id, date=date.today()).first()
        exercise = ExerciseModel.query.filter_by(id=exercise_id).first()
        if entry:
            entry.sets.append(s)
        elif not exercise:
            abort(404, description="No exercise with that ID exists")
        else:
            entry = EntryModel(exercise_id=exercise_id, text=text, sets=[s])
        
        db.session.add(entry)
        db.session.commit()
        return entry, 201

api.add_resource(GetExercise, "/exercise/<exercise_id>")
api.add_resource(CreateExercise, "/exercise/create")

api.add_resource(StartWorkout, "/workouts/start")
api.add_resource(EndWorkout, "/workouts/end")
api.add_resource(GetWorkout, "/workouts/<workout_id>")

api.add_resource(MakeEntry, "/exercise/<int:exercise_id>/entries/create")
api.add_resource(GetEntries, "/exercise/<int:exercise_id>/entries/<num_entries>")


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
