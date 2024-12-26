from flask_restful import Resource, abort, marshal_with
from models import ExerciseModel, EntryModel
from fields import stats_fields
from bisect import bisect_left
from datetime import date
from dateutil.relativedelta import relativedelta


def getOneRepMax(exercise):
    entries = EntryModel.query.filter_by(exercise_id=exercise.id).all()
    sets = [(s.weight, s.units, entry.date) for entry in entries for s in entry.sets]
    if not sets:
        return {}
    weight, units, date = sorted(sets, key=lambda s: (-int(s[0]) * (2.2 if s[1] == "kg" else 1), s[2]))[0]
    return {
        "weight": weight,
        "units": units,
        "date": date
    }


def getVolumePerWorkout(exercise):
    calculateVolume = lambda lst: sum(x[1] for x in lst) // len(lst) if lst else -1
    entries = EntryModel.query.filter_by(exercise_id=exercise.id).all()
    volume = []
    for entry in entries:
        s = 0
        for set in entry.sets:
            s += int(set.weight) * (2.2 if set.units == "kg" else 1) * int(set.reps)
        volume.append((entry.date, s))

    oneWeekAgo = bisect_left(volume, (date.today() + relativedelta(days=-7), 0))
    TwoWeeksAgo = bisect_left(volume, (date.today() + relativedelta(days=-14), 0))
    oneMonthAgo = bisect_left(volume, (date.today() + relativedelta(months=-1), 0))
    twoMonthsAgo = bisect_left(volume, (date.today() + relativedelta(months=-2), 0))

    return {
        "thisWeek": calculateVolume(volume[oneWeekAgo:]),
        "lastWeek": calculateVolume(volume[TwoWeeksAgo:oneWeekAgo]),
        "thisMonth": calculateVolume(volume[oneMonthAgo:]),
        "lastMonth": calculateVolume(volume[twoMonthsAgo:oneMonthAgo]),
    }


def propagateStats(exercise):
    shownStats = []
    stats = {}

    # One Rep Max
    stats["oneRepMax"] = getOneRepMax(exercise)
    if stats["oneRepMax"]:
        shownStats.append("oneRepMax")
    
    # Volume Per Workout
    stats["volumePerWorkout"] = getVolumePerWorkout(exercise)
    if -1 not in [stats["volumePerWorkout"]["thisWeek"], stats["volumePerWorkout"]["lastWeek"]]:
        shownStats.append("vpwWeek")
    if -1 not in [stats["volumePerWorkout"]["thisMonth"], stats["volumePerWorkout"]["lastMonth"]]:
        shownStats.append("vpwMonth")

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
        
        return propagateStats(exercise), 201
