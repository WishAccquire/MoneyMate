from flask_cors import CORS
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt_identity,
    get_jwt,
    JWTManager
)
from config import Config  # Import the Config class

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for frontend connection
CORS(app)

# Load configuration from Config class
app.config.from_object(Config)

# Set JWT Secret Key
app.config["JWT_SECRET_KEY"] = "your_secret_key_here"  # Change this to a strong secret key
jwt = JWTManager(app)

# Initialize MongoDB connection
mongo = PyMongo(app, uri=f"mongodb://{Config.MONGODB_SETTINGS['host']}:{Config.MONGODB_SETTINGS['port']}/{Config.MONGODB_SETTINGS['db']}")

# Debug Route to Check if Flask is Running
@app.route("/")
def home():
    return "Flask is running!"

# User Registration Route
@app.route("/register", methods=["POST"])
def register():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    role = data.get("role", "customer")

    existing_user = mongo.db.users.find_one({"email": email})
    if existing_user:
        return jsonify({"error": "User already exists!"}), 400

    hashed_password = generate_password_hash(password)
    user_data = {"name": name, "email": email, "password": hashed_password, "role": role}
    mongo.db.users.insert_one(user_data)

    return jsonify({"message": "User registered successfully!"}), 201

# User Login Route
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = mongo.db.users.find_one({"email": email})
    if user and check_password_hash(user["password"], password):
        # Use email as identity, and role as additional claims
        access_token = create_access_token(identity=email, additional_claims={"role": user["role"]})
        refresh_token = create_refresh_token(identity=email, additional_claims={"role": user["role"]})
        return jsonify({"message": "Login successful!", "access_token": access_token, "refresh_token": refresh_token}), 200

    return jsonify({"error": "Invalid email or password!"}), 401

# Protected Route (Requires JWT)
@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()  # This now only contains the email
    claims = get_jwt()  # Get additional claims
    return jsonify({"message": "Protected route accessed!", "user": current_user, "role": claims["role"]}), 200

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)

