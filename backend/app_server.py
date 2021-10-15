from flask import Flask, request
from flask_socketio import SocketIO
from app.views import APP
import json

def create_app():
    app = Flask(__name__)
    app.sock = SocketIO(app, cors_allowed_origins="*")
    app.SESSION_TO_SID = {}
    app.app_context().push()

    @app.sock.on("message")
    def register_sid(msg):
        data = json.loads(msg)
        app.SESSION_TO_SID[data['session_id']] = request.sid
        print("SESSION_MAP", app.SESSION_TO_SID)

    @app.sock.on("connect")
    def announce_connection():
        print("CONNECTED", request.sid)

    @app.sock.on("disconnect")
    def announce_connection():
        print("DISCONNECTED", request.sid)

    @app.route('/', methods=['GET', 'POST'])
    def index():
        return 'App Server'

    app.register_blueprint(APP, url_prefix='/app')
    return app
