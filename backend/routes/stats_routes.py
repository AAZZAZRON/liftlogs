from flask import current_app, jsonify
from flask_restful import Resource, reqparse, abort, marshal_with
from extensions import db
from models import ExerciseModel, EntryModel, SetModel
from fields import stats_fields


def getOneRepMax(exercise):
    entries = EntryModel.query.filter_by(exercise_id=exercise.id).all()
    sets = [(s.weight, s.units, entry.date) for entry in entries for s in entry.sets]
    if not sets:
        return {}
    weight, units, date = sorted(sets, key=lambda s: (-int(s[0]) * (2.2 if s[1] == "kg" else 1), s[2]))[0]
    print(weight, units, date)
    return {
        "weight": weight,
        "units": units,
        "date": date
    }


def propagateStats(exercise):
    shownStats = []
    stats = {}

    stats["oneRepMax"] = getOneRepMax(exercise)
    if stats["oneRepMax"]:
        shownStats.append("oneRepMax")
        print(exercise.id, stats)


    return {
        "id": exercise.id, 
        "shownStats": shownStats, 
        "stats": stats
    }


class GetStatsAll(Resource):
    @marshal_with(stats_fields)
    def get(self):
        exercises = ExerciseModel.query.all()
        return [propagateStats(exercise) for exercise in exercises], 201
    

class GetStatsOne(Resource):
    @marshal_with(stats_fields)
    def get(self, exercise_id):
        try:
            exercise_id = int(exercise_id)
            if exercise_id <= 0:
                raise ValueError
            exercise = ExerciseModel.query.filter_by(id=exercise_id).first()
        except ValueError:
            abort(400, description="Invalid id number")
    
        if not exercise and exercise_id != "all":
            abort(404, description="Exercise does not exist")
        
        print(propagateStats(exercise))

        return propagateStats(exercise), 201
