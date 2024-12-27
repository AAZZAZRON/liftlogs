from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
import functools
import os
from dotenv import load_dotenv
from flask import request
from flask_restful import abort

def require_authentication(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        load_dotenv()
        API_KEY = os.environ.get("API_KEY")
        api_key = request.headers.get('x-api-key')
        print(API_KEY, api_key)
        if not api_key:
            abort(400, description="Please provide an API key")
        if api_key != API_KEY:
            abort(401, description="Unauthorized access")
        return func(*args, **kwargs)
    return wrapper


class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)
api = None

