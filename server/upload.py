from flask import Flask, render_template, request
from werkzeug import secure_filename
from flask_cors import CORS
import trial2

app = Flask(__name__)
CORS(app)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
UPLOAD_FOLDER = '/path/to/the/uploads'
ALLOWED_EXTENSIONS = set(['csv'])
           
@app.route('/upload')
def uploade_file():
   return render_template('./upload.html')
	
@app.route('/uploader', methods = ['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            return "no file attached"
      # if user does not select file, browser also
        # submit an empty part without filename
        f = request.files['file']
        if f.filename == '':
            return "no file selected"
        if f and allowed_file(f.filename):
            f.save(secure_filename(f.filename))
            return 'file uploaded successfully'
        else:
            return 'incorrect file type'

@app.route('/lg', methods = ['GET', 'POST'])
def upload_file_and_do_regressions():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            return "no file attached"
      # if user does not select file, browser also
        # submit an empty part without filename
        f = request.files['file']
        if f.filename == '':
            return "no file selected"
        if f and allowed_file(f.filename):
            f.save(secure_filename(f.filename))
            #import trial2
            return trial2.processFile(f.filename)
            #return 'file uploaded successfully'
        else:
            return 'incorrect file type'
        
@app.route('/linearregression', methods = ['GET', 'POST'])
def upload_file_and_do_regression():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            return "from server:no file attached"
      # if user does not select file, browser also
        # submit an empty part without filename
        f = request.files['file']
        if f.filename == '':
            return "no file selected"
        if f and allowed_file(f.filename):
            f.save(secure_filename(f.filename))
            
            return trial2.performRegression(f.filename,1)
            #return 'file uploaded successfully'
        else:
            return 'incorrect file type'	

@app.route('/logisticregression', methods = ['GET', 'POST'])
def upload_file_and_do_logistic_regression():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            return "no file attached"
      # if user does not select file, browser also
        # submit an empty part without filename
        f = request.files['file']
        if f.filename == '':
            return "no file selected"
        if f and allowed_file(f.filename):
            f.save(secure_filename(f.filename))
            import trial2
            return trial2.performRegerssion(f.filename,2)
            #return 'file uploaded successfully'
        else:
            return 'incorrect file type'	
        

if __name__ == '__main__':
   app.run(debug = True) 