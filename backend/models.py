from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column
from extensions import db

class Exercise(db.Model):
    __tablename__ = "exercise"
    id = mapped_column(Integer, primary_key=True)
    name = mapped_column(String(50), nullable=False)
    # logs


class Entry(db.Model):
    __tablename__ = "entry"
    id = mapped_column(Integer, primary_key=True)
    text = mapped_column(String, nullable=False)
    