#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Oct  4 16:10:20 2018

@author: narmadharajendran
"""
from flask import Flask, jsonify, request
import pandas as pd
import os
from sklearn.externals import joblib
from sklearn.linear_model import LinearRegression
from flask_cors import CORS

from werkzeug.utils import secure_filename


app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = '/Users/narmadharajendran/Desktop/playground/pythonapi/uploads'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif','pdf'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
           
@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            return 'no file'
        file = request.files['file']
        # if user does not select file, browser also
        # submit a empty part without filename
        if file.filename == '':
            return 'user has not selected the file'
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return 'file saved'
    return 'alldone'

@app.route("/predict", methods=['POST'])
def predict():
    if request.method == 'POST':
        try:
            data = request.get_json()
            years_of_experience = float(data["yearsOfExperience"])

            filename = 'trial_regression_model.sav';
            lin_reg = joblib.load(filename)
        except ValueError:
            return jsonify("Please enter a number.")

        return jsonify(lin_reg.predict(years_of_experience).tolist())



@app.route("/retrain", methods=['POST'])
def retrain():
    if request.method == 'POST':
        data = request.get_json()

        try:
            training_set = joblib.load("./training_data.pkl")
            training_labels = joblib.load("./training_labels.pkl")

            df = pd.read_json(data)

            df_training_set = df.drop(["Salary"], axis=1)
            df_training_labels = df["Salary"]

            df_training_set = pd.concat([training_set, df_training_set])
            df_training_labels = pd.concat([training_labels, df_training_labels])

            new_lin_reg = LinearRegression()
            new_lin_reg.fit(df_training_set, df_training_labels)

            os.remove("./linear_regression_model.pkl")
            os.remove("./training_data.pkl")
            os.remove("./training_labels.pkl")

            joblib.dump(new_lin_reg, "linear_regression_model.pkl")
            joblib.dump(df_training_set, "training_data.pkl")
            joblib.dump(df_training_labels, "training_labels.pkl")

        except ValueError as e:
            return jsonify("Error when retraining - {}".format(e))

        return jsonify("Retrained model successfully.")


@app.route("/currentDetails", methods=['GET'])
def current_details():
    if request.method == 'GET':
        try:
            lr = joblib.load("./linear_regression_model.pkl")
            training_set = joblib.load("./training_data.pkl")
            labels = joblib.load("./training_labels.pkl")

            return jsonify({"score": lr.score(training_set, labels),
                            "coefficients": lr.coef_.tolist(), "intercepts": lr.intercept_})
        except (ValueError, TypeError) as e:
            return jsonify("Error when getting details - {}".format(e))


if __name__ == '__main__':
    app.run(debug=True)