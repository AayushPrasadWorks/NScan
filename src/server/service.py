from flask import Flask
from flask import request

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
       f = request.files["file"]
       print(f)
       f.save(f.filename)
       return 'ok'

if __name__ == "__main__":
    app.run()
