from flask import Flask
from flask_restful import Api
from extensions import db
from flask_cors import CORS
from fields import *
from routes.exercise_routes import * 
from routes.workout_routes import * 
from routes.entry_routes import *
from routes.set_routes import *
from routes.stats_routes import *


# initialize flask app
app = Flask(__name__)
api = Api(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
db.init_app(app)
CORS(app)


# create db table
with app.app_context():
    db.create_all()


# API URLs
api.add_resource(GetExercise, "/exercise/<exercise_id>")
api.add_resource(CreateExercise, "/exercise/create")

api.add_resource(StartWorkout, "/workouts/start")
api.add_resource(EndWorkout, "/workouts/end")
api.add_resource(GetWorkout, "/workouts/<workout_id>")
api.add_resource(GetUncompletedWorkoutId, "/workouts/uncompleted")

api.add_resource(GetEntries, "/entries")

api.add_resource(CreateSet, "/addset")
api.add_resource(GetSets, "/sets")

api.add_resource(GetStatsAll, "/stats/all")
api.add_resource(GetStatsOne, "/stats/<exercise_id>")

# Run App
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
