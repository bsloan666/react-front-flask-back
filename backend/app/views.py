# Author: bsloan 
"""
    Standard Flask Application endpoints
"""
import threading
import os
import json
import subprocess
import sys
from flask import Flask, Blueprint, render_template, request
from flask_socketio import SocketIO, send

APP = Blueprint('app', __name__,
                template_folder='templates',
                static_folder='static')

sock = SocketIO(Flask(__name__), cors_allowed_origins="*")

def execute_with_updates(cmd):
    """
    Wrap Popen to grab output as it is appears.
    from: https://stackoverflow.com/questions/4417546/constantly-print-subprocess-output-while-process-is-running  
    """
    popen = subprocess.Popen(cmd, stdout=subprocess.PIPE, universal_newlines=True)
    for stdout_line in iter(popen.stdout.readline, ""):
        yield stdout_line 
    popen.stdout.close()
    return_code = popen.wait()
    if return_code:
        raise subprocess.CalledProcessError(return_code, cmd)


@sock.on("message")
def add2(msg):
    """
    The request will have Left Hand Side and Right Hand Side arguments.
    Sum them and save the result  
    """

    data = json.loads(msg)
    print("Recieved:", data)
    lhs = float(data.get('lhs'))
    rhs = float(data.get('rhs'))
    session_id = data.get('session_id')

    path_to_exe = os.path.abspath(os.path.join(os.path.dirname(os.path.dirname(__file__)), 'bin', 'slowadd.py')) 
    cmd = ["python", path_to_exe, str(lhs), str(rhs)]
    for line in execute_with_updates(cmd):
        send(line)
    
    return {'lhs':lhs, 'rhs':rhs, 'session_id':session_id}


@APP.route('/command_status', methods=['GET', 'POST'])
def command_status():
    """
    Once the client has asked us to perform some expensive computation,
    he can call this endpoint periodically (with the session_id) and get the latest
    state of the output
    """
    data = request.json
    session_id = data.get('session_id')
    return {"session_id":session_id} 

