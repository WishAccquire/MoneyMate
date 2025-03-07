import os

class Config:
    SECRET_KEY = "Moneymate_auth"  # Change this to a strong secret key
    MONGODB_SETTINGS = {
        "db": "moneymate",
        "host": "localhost",
        "port": 27017,
        "username": "your_mongo_user",  # Add this
        "password": "your_mongo_password"  # Add this
    }

