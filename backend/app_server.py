from wsgi import application
from flask_socketio import SocketIO
from app import views

views.sock = SocketIO(application, cors_allowed_origins="*")

views.socket_funcs()

if __name__ == "__main__":
    views.sock.run(application)
