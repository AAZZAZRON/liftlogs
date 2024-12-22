from flask_restful import fields
from datetime import date


class DateField(fields.Raw): # custom date field
    def format(self, value):
        if isinstance(value, date):
            return value.isoformat()  # Convert to 'YYYY-MM-DD' format
        raise fields.MarshallingException('Unsupported field type')

# ----- Marshall Types ----- #
set_fields = {
    "id": fields.Integer,
    "entry_id": fields.Integer,
    "reps": fields.Integer,
    "weight": fields.Float,
    "units": fields.String,
    "notes": fields.String
}

entry_fields = {
    "id": fields.Integer,
    "date": DateField,
    "exercise_id": fields.Integer,
    "workout_id": fields.Integer,
    "notes": fields.String,
}

exercise_fields = {
    "id": fields.Integer,
    "name": fields.String,
}

workout_fields = {
    "id": fields.Integer,
    "date": DateField,
    "completed": fields.Boolean,
    "start_time": fields.DateTime,
    "end_time": fields.DateTime,
    "duration": fields.Integer,
    "notes": fields.String,
}
