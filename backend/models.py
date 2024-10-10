from extensions import db
from datetime import date
from sqlalchemy.ext.mutable import MutableList
from sqlalchemy import JSON


class ExerciseModel(db.Model):
    __tablename__ = 'exercise'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    logs = db.relationship("EntryModel", backref="exercise")


class EntryModel(db.Model):
    __tablename__ = 'entry'
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False, default=date.today)
    exercise_id = db.Column(db.Integer, db.ForeignKey("exercise.id"), nullable=False)
    text = db.Column(db.String, nullable=True)
    sets = db.Column(MutableList.as_mutable(JSON))
