#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Oct  7 16:28:18 2018

@author: narmadharajendran
"""

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Oct  4 16:12:37 2018

@author: narmadharajendran
"""

import pandas as pd
import json
from sklearn import linear_model
from sklearn.linear_model import LogisticRegression

def loadData(filename):
    #it loads the data in csv file into x and y variables and return x and y
    data = pd.read_csv(filename);
    return data;

def performRegression(file,regtype):
    X = loadData(file);
    y = X.iloc[:,-1];
    X = X.drop(axis=1,columns=[X.columns[-1]]);
    
    if (regtype == 1):
        model = performRegression(X,y);
    else:
        model = logisticRegression(X,y);
        
    prediction = pd.DataFrame(model.predict(X),columns=['predicted_values']);
    output = {
                'prediction':prediction.to_json(),
                'score':str(model.score(X,y))
            }
    return json.dumps(output);
    

def lineaerRegerssion(X,y):
    lm = linear_model.LinearRegression();
    model = lm.fit(X,y);
    return model;

def logisticRegression(X,y):
    logisticRegr = LogisticRegression();
    model = logisticRegr.fit(X, y);
    return model;


#from sklearn.externals import joblib;
#filename = 'trial_regression_model.sav';
#joblib.dump(model, filename);

