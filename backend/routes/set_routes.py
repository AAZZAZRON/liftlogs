from flask import current_app
from flask_restful import Resource, reqparse, abort, marshal_with
from extensions import db
from models import SetModel, EntryModel
from fields import set_fields

# ----- Reqparser Arguments ----- #
set_post_args = reqparse.RequestParser()
set_post_args.add_argument("exercise_id", type=int, help="exercise_id is required", required=True)
set_post_args.add_argument("workout_id", type=int, help="workout_id is required", required=True)
set_post_args.add_argument("reps", type=int, help="Reps must be an integer", required=True)
set_post_args.add_argument("weight", type=float, help="Weight must be an integer", required=True)
set_post_args.add_argument("units", type=str, help="Units must be one of ['lbs', 'kg']", required=True)
set_post_args.add_argument("notes", type=str, required=False)

set_get_args = reqparse.RequestParser()
set_get_args.add_argument("entry_id", type=int, help="entry_id is required", required=True)


class CreateSet(Resource):
    @marshal_with(set_fields)
    def post(self):
        set_args = set_post_args.parse_args()
        exercise_id = set_args.get('exercise_id')
        workout_id = set_args.get('workout_id')
        reps = set_args.get('reps')
        weight = set_args.get('weight')
        units = set_args.get('units')
        notes = set_args.get('notes')

        # Check that exercise and workout are both good
        with current_app.test_client() as client:
            e_response = client.get(f"exercise/{exercise_id}")
            if e_response.status_code != 201:
                abort(e_response.status_code, description=e_response.json["description"])
            
            w_response = client.get(f"workouts/{workout_id}")
            if w_response.status_code != 201:
                print(w_response.status_code, w_response.json)
                abort(w_response.status_code, description=w_response.json["description"])

            exercise = e_response.json
            workout = w_response.json
        
        if workout["completed"]:
            abort(400, description="Invalid: Workout is already completed")


        entry = EntryModel.query.filter_by(exercise_id=exercise_id, workout_id=workout_id).first()
        if not entry:
            entry = EntryModel(exercise_id=exercise_id, workout_id=workout_id)
            db.session.add(entry)
            db.session.commit()

        set = SetModel(entry_id=entry.id, reps=reps, weight=weight, units=units, notes=notes)
        db.session.add(set)
        db.session.commit()
        return set, 201


class GetSets(Resource):
    @marshal_with(set_fields)
    def get(self):
        set_args = set_get_args.parse_args() 
        entry_id = set_args.get("entry_id")
        filters = []
        if entry_id:
            try:
                entry_id = int(entry_id)
                if entry_id <= 0:
                    raise ValueError
                filters.append(SetModel.entry_id == entry_id)
            except ValueError:
                return {"message": "Invalid entry_id"}, 400
        
        results = SetModel.query.filter(*filters).all()
        return results, 201

