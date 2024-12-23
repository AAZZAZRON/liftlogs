from flask_restful import Resource, reqparse, abort, marshal_with
from datetime import datetime
from extensions import db
from models import WorkoutModel
from fields import workout_fields

# ----- Reqparser Arguments ----- #
workout_end_args = reqparse.RequestParser()
workout_end_args.add_argument("id", type=int, help="Workout ID is required", required=True)
workout_end_args.add_argument("notes", type=str, default="", required=False)


class StartWorkout(Resource):
    @marshal_with(workout_fields)
    def post(self):
        workout = WorkoutModel()
        db.session.add(workout)
        db.session.commit()
        return workout, 201


class EndWorkout(Resource):
    @marshal_with(workout_fields)
    def post(self):
        workout_args = workout_end_args.parse_args()
        print(workout_args)
        workout = WorkoutModel.query.filter_by(id=workout_args["id"]).first()
        if not workout:
            abort(404, description="You cannot end a workout that hasn't started.")
        if workout.end_time:
            abort(409, description="This workout already ended.")

        # end workout
        workout.completed = True
        workout.end_time = datetime.now()
        WorkoutModel.calculate_duration(workout)
        workout.notes = workout_args["notes"]

        db.session.add(workout)
        db.session.commit()
        return workout, 201
    

class GetWorkout(Resource):
    @marshal_with(workout_fields)
    def get(self, workout_id):
        if workout_id == "all":
            result = WorkoutModel.query.all()
        else:
            try:
                workout_id = int(workout_id)
                if workout_id <= 0:
                    raise ValueError
                result = WorkoutModel.query.filter_by(id=workout_id).first()
            except ValueError:
                return {"message": "Invalid id number"}, 400
        
        if not result:
            abort(404, description="Workout does not exist")

        return result, 201