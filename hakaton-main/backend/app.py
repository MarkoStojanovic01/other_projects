from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from flask_mail import Mail,Message
import pickle 
import numpy as np


app = Flask(__name__)
CORS(app)

# Sending Mail:
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'premimptemp@gmail.com'
app.config['MAIL_PASSWORD'] = 'hjqm yipt ycef kvod'
app.config['MAIL_DEFAULT_SENDER'] = 'premimptemp@gmail.com'

mail = Mail(app)

# MongoDB Connection (Local or Atlas)
MONGO_URI = 'mongodb+srv://pera:9cPqRx2VRqJ17dsN@mern-workout.ro312.mongodb.net/?retryWrites=true&w=majority&appName=MERN-Workout'
DB_NAME = 'hakaton'
client = MongoClient(MONGO_URI)
db = client[DB_NAME]
collection = db["images"]

# Test backend
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Flask & MongoDB connected!"})

# Test database
@app.route("/get_users", methods=["GET"])
def get_users():
    users = list(collection.find({}, {"_id": 0}))  # Exclude `_id` field when returning data from database.
    return jsonify(users)

# Test database
@app.route("/predict_personality", methods=["POST"])
def predict_personality():
    data = request.get_json()

    ans1 = data.get('ans1')
    ans2 = data.get('ans2')
    ans3 = data.get('ans3')
    ans4 = data.get('ans4')
    ans5 = data.get('ans5')
    ans6 = data.get('ans6')
    ans7 = data.get('ans7')
    ans8 = data.get('ans8')

    x = [ans4, ans3, ans2, ans7, ans6, ans8, ans5, ans1]

    with open('./rf_model.pickle', 'rb') as f:
        __model = pickle.load(f)
    probabs = __model.predict_proba([x])

    print(probabs)
    array = np.array(probabs[0])
    return jsonify(array.tolist())


# Send email:
# @app.route('/send-email')
# def send_email():
#     msg = Message("Test Email from Flask", recipients=['premimptemp@gmail.com'])
#     msg.body = "Hello! This is a test email sent from Flask-Mail."
#     try:
#         mail.send(msg)
#         return "Email sent successfully!"
#     except Exception as e:
#         return str(e)


if __name__ == "__main__":
    app.run(debug=True)