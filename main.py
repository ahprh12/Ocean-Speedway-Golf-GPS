import os, time
import logging
import re
import glob
import datetime


"""
NFL Scaws code adapated by https://github.com/SuperRonJon
"""

from flask import Flask, jsonify, request, render_template, redirect
#from google.cloud import storage
from forms import HoleForm
import NFLScores as nfl
import utsa
import swingstats

# If `entrypoint` is not defined in app.yaml, App Engine will look for an app
# called `app` in `main.py`.
app = Flask(__name__, static_url_path='/static')

SECRET_KEY = os.urandom(32)
app.config['SECRET_KEY'] = SECRET_KEY

# file upload for utsa
# https://blog.miguelgrinberg.com/post/handling-file-uploads-with-flask

"""
CLOUD_STORAGE_BUCKET = 'utsa'
# Create a Cloud Storage client.
gcs = storage.Client()

# Get the bucket that the file will be uploaded to.
bucket = gcs.get_bucket(CLOUD_STORAGE_BUCKET)
"""

# Use this code snipped because flask caches static files
# returns the last update timestamp for js folder (can specify dir or file in this method)
# credit @marredcheese response
# https://stackoverflow.com/questions/41144565/flask-does-not-see-change-in-js-file/41150548
# and also here
# https://www.kite.com/python/answers/how-to-get-the-last-modified-time-of-a-file-in-python#:~:text=Use os.,get the last modified time&text=getmtime(path) to find the,point at which time starts).
# and finally here
# https://stackoverflow.com/questions/39327032/how-to-get-the-latest-file-in-a-folder-using-python
my_path = os.path.abspath(os.path.dirname(__file__))
folder = os.path.join(my_path, 'static/js/*')
list_of_files = glob.glob(folder)
latest_file = max(list_of_files, key=os.path.getmtime)
last_updated = os.path.getmtime(latest_file)


@app.route('/')
def home():

    return render_template('home.html')



@app.route('/gps')
def gps():

    form = HoleForm()
    return render_template('gps.html', form=form, last_updated=last_updated)


@app.route('/swingstats/<club>')
def showSwingStats(club):

    if club is None:

        return render_template('swingstats.html', profile='Select club to view stats.')

    else:

        profile = swingstats.showClubProfile(club)
        return render_template('swingstats.html', profile=profile)


@app.route('/nfl')
def index():
    
    return render_template('nfl_index.html')


@app.route('/week')
def week_matches():

    try:
        year = request.args['year']
        week = request.args['week']
    except:
        return render_template('notfound.html', title='Whoops...')

    games = nfl.getnflweek(week, year)

    return render_template('week.html', games=games, year=year, week=week)


@app.route('/update_week/<year>/<week>', methods=['POST'])
def update_week(year, week):
    
    nfl.liveWeekRefresh(year, week)

    return redirect("/week?year={}&week={}".format(year, week))


@app.route('/match/<gameid>')
def game_scores(gameid):

    game, title = nfl.getmatch(gameid)

    return render_template('match.html', game=game, title=title)


@app.route('/update_match/<gameid>', methods=['POST'])
def update_match(gameid):
    if request.method == 'POST':

        nfl.updatematch(gameid)
        
        return redirect('/match/' + str(gameid))



@app.errorhandler(500)
def server_error(e):
    logging.exception('An error occurred during a request.')
    return """
    An internal error occurred: <pre>{}</pre>
    See logs for full stacktrace.
    """.format(e), 500



""" @app.route('/utsa')
def selfscout():

    ssBlob = list(bucket.list_blobs())[0]

    date_default_timezone_set("America/Chicago");
    ssFile = 'Currently Reading from <a href=' + str(ssBlob.public_url) + '> uploaded ' + str(ssBlob.time_created.strftime('%m-%d-%Y %I:%M %p'))

    #fpath = "utsa/Resources/selfscoutdata.xlsx" use this for testing
    overall = utsa.getRP(ssBlob.public_url)
    total,summary = utsa.summaryTable(ssBlob.public_url)
    down, expand = utsa.downs(ssBlob.public_url)


    return render_template('utsa.html', ssFile=ssFile, last_updated=last_updated, down=down,expand=expand,summary=summary, tables=[total.to_html(classes='data', header='true', index=False), overall.to_html(classes='data', header='true', index=False)]) 
"""

"""
# GCP Cloud Storage file upload (regular file upload not supported in GCP)
@app.route('/utsa', methods=['POST'])
def upload_files():
    uploaded_file = request.files.get('file')

    if not uploaded_file:
        return 'No file uploaded.', 400

    # a blob is a file, delete all the files and then upload new (overwrite workaround)
    blobs = bucket.list_blobs()
    for blob in blobs:
        blob.delete()

    # Create a new blob and upload the file's content.
    blob = bucket.blob(uploaded_file.filename)

    blob.upload_from_string(
        uploaded_file.read(),
        content_type=uploaded_file.content_type
    )

    # The public URL can be used to directly access the uploaded file via HTTPS.
    global ssFile
    global upload_date
    ssFile = blob.public_url
    upload_date = blob.time_created

    return redirect('/utsa')
"""


if __name__ == '__main__':
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. This
    # can be configured by adding an `entrypoint` to app.yaml.
    app.run(host='127.0.0.1', port=8080, debug=True)
# [END gae_python37_app]
