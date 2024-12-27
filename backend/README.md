# Liftlogs Backend Server
This is the backend server for the Liftlogs project. It is a RESTful API built with Flask and SQLAlchemy.

## Installation
1. Clone the repository
2. Create/activate a virtual environment
3. Install the dependencies
```bash
pip install -r requirements.txt
```
4. Run the flask server
```bash
python main.py
```

## API Documentation
All API endpoints require a valid JWT token in the Authorization header. TODO: 

### Exercise
GET `/exercise/all`
- Desc: Gets all exercises

GET `/exercise/<id>`
- Desc: Gets an exercise by id

POST `/exercise/create`
- Desc: Create a new exercise
- Required params: name

### Workout
POST `/workouts/start`
- Desc: Starts a new workout

POST `/workouts/end`
- Desc: Ends a workout (must exist and not be ended)
- Required params: id
- Optional params: notes

GET `/workouts/all`
- Desc: Gets all workouts

GET `/workouts/<id>`
- Desc: Gets a workout by id

### Entries
GET `/entries`
- Desc: Gets all workouts
- Optional params: workout_id, exercise_id
- Note: Entries are automatically created when a new set is added to a workout that does not already have an entry

### Sets
POST `/addset`
- Desc: Adds a set to a workout
- Required params: workout_id, exercise_id, reps, weight, units
- Optional params: notes

GET `/sets`
- Desc: Gets a set by entry_id
- Required params: entry_id

### Stats
GET `/stats/all`
- Desc: Gets all stats for all exercises

GET `/stats/<id>`
- Desc: Gets stats for an exercise by id

## License
[MIT](https://choosealicense.com/licenses/mit/)

