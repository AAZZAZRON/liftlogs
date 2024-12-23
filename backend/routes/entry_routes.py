from flask_restful import Resource, reqparse, abort, marshal_with
from extensions import db
from models import EntryModel
from fields import entry_fields


entry_get_args = reqparse.RequestParser()
entry_get_args.add_argument("exercise_id", type=int, required=False, help="exercise_id is invalid")
entry_get_args.add_argument("workout_id", type=int, required=False, help="workout_id is invalid")


class GetEntries(Resource):
    @marshal_with(entry_fields)
    def get(self):
        entry_args = entry_get_args.parse_args() 
        exercise_id = entry_args.get("exercise_id")
        workout_id = entry_args.get("workout_id")
        print(exercise_id, workout_id)
        filters = []
        if exercise_id:
            try:
                exercise_id = int(exercise_id)
                if exercise_id <= 0:
                    raise ValueError
                filters.append(EntryModel.exercise_id == exercise_id)
            except ValueError:
                return {"message": "Invalid exercise_id"}, 400
        if workout_id:
            try:
                workout_id = int(workout_id)
                if workout_id <= 0:
                    raise ValueError
                filters.append(EntryModel.workout_id == workout_id)
            except ValueError:
                return {"message": "Invalid workout_id"}, 400
        results = EntryModel.query.filter(*filters).all()
        return results, 201

