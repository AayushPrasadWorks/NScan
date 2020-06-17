from flask import Flask
from flask import request
from cv2 import cv2
import numpy as np
from PIL.ImageFilter import numpy
import ocr

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def upload():
    f = request.files["file"]
    if request.method == 'POST':
       print(f)
       fstr = request.files['file'].read()
       npimg = np.frombuffer(fstr, dtype='int8')
       img = cv2.imdecode(npimg, cv2.IMREAD_UNCHANGED)
       json = ocr.print_json(img)
       print(json)
       return 'ok'

if __name__ == "__main__":
    app.run()
