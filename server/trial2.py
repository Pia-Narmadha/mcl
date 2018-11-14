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
#%%
def processFile(filename):
    X = loadData(filename);
    return X.to_json(orient="split");#using split formats the json as an object like this {"columns":["a","b","c"],"index":[0,1,2],"data":[[1,2,3],[3,4,5],[2,3,4]]}
d = processFile("test.csv");
#%%
def performRegression(file,regtype):
    X = loadData(file);
    y = X.iloc[:,-1];
    X = X.drop(axis=1,columns=[X.columns[-1]]);
    
    if (regtype == 1):
        model = linearRegression(X,y);
    else:
        model = logisticRegression(X,y);
        
    prediction =list(model.predict(X));
    output = {
                'prediction':prediction,
                'score':model.score(X,y)
            }
    #return prediction;
    #return output;
    return json.dumps(output);
    

def linearRegression(X,y):
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

