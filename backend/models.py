from extensions import db
from datetime import date, datetime


class ExerciseModel(db.Model):
    __tablename__ = 'exercise'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    logs = db.relationship("EntryModel", backref="exercise")


class WorkoutModel(db.Model):
    __tablename__ = 'workout'
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False, default=date.today)
    completed = db.Column(db.Boolean, default=False)
    start_time = db.Column(db.DateTime, nullable=False, default=datetime.now())
    end_time = db.Column(db.DateTime, nullable=True)
    duration = db.Column(db.Integer, nullable=True)
    notes = db.Column(db.String, nullable=True, default="")
    exercises = db.relationship("EntryModel", backref="workout")

    def calculate_duration(self):
        if self.start_time and self.end_time:
            self.duration = int((self.end_time - self.start_time).total_seconds())


class EntryModel(db.Model):
    __tablename__ = 'entry'
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False, default=date.today)
    exercise_id = db.Column(db.Integer, db.ForeignKey("exercise.id"), nullable=False)
    workout_id = db.Column(db.Integer, db.ForeignKey("workout.id"), nullable=False)
    notes = db.Column(db.String, nullable=True, default="") # useless
    sets = db.relationship("SetModel", backref="entry")


class SetModel(db.Model):
    __tablename__ = 'set'
    id = db.Column(db.Integer, primary_key=True)
    entry_id = db.Column(db.Integer, db.ForeignKey("entry.id"), nullable=False)
    reps = db.Column(db.Integer, nullable=False)
    weight = db.Column(db.Float, nullable=False)
    units = db.Column(db.String, default="lbs")
    notes = db.Column(db.String, nullable=True, default="")

