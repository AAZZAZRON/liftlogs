from flask_restful import Resource, reqparse, abort, marshal_with
from extensions import db
from models import ExerciseModel
from fields import exercise_fields

# ----- Reqparser Arguments ----- #
exercise_post_args = reqparse.RequestParser()
exercise_post_args.add_argument("name", type=str, help="Name of exercise is required", required=True)

class CreateExercise(Resource):
    @marshal_with(exercise_fields)
    def post(self):
        exercise_args = exercise_post_args.parse_args()

        if ExerciseModel.query.filter_by(name=exercise_args["name"]).first():
            abort(409, description="Exercise already exists")
        
        exercise = ExerciseModel(name=exercise_args["name"])
        db.session.add(exercise)
        db.session.commit()
        return exercise, 201
    

class GetExercise(Resource):
    @marshal_with(exercise_fields)
    def get(self, exercise_id):
        if exercise_id == "all":
            result = ExerciseModel.query.all()
        else:
            try:
                exercise_id = int(exercise_id)
                if exercise_id <= 0:
                    raise ValueError
                result = ExerciseModel.query.filter_by(id=exercise_id).first()
            except ValueError:
                return {"message": "Invalid id number"}, 400
        
        if not result and exercise_id != "all":
            abort(404, description="Exercise does not exist")

        return result, 201