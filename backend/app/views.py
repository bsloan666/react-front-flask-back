# Author: bsloan 
"""
    Standard Flask Application endpoints
"""
import os
from io import StringIO
import sys
import json
import subprocess
from flask import current_app as app
from flask import Blueprint, render_template, request

#from bin import slowadd

APP = Blueprint('app', __name__,
                template_folder='templates',
                static_folder='static')


def execute_with_updates(cmd):
    """
    Wrap Popen to grab output as it is appears.
    from: https://stackoverflow.com/questions/4417546/constantly-print-subprocess-output-while-process-is-running  
    """
    #popen = subprocess.Popen(cmd, stdout=subprocess.PIPE, universal_newlines=True)
    proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, universal_newlines=True)
    for stdout_line in iter(proc.stdout.readline, ""):
        yield stdout_line 
    proc.stdout.close()
    return_code = proc.wait()
    if return_code:
        raise subprocess.CalledProcessError(return_code, cmd)

def run(lhs, rhs, session_id):
    print("RUNNING PROGRAM")
    path_to_exe = os.path.abspath(os.path.join(os.path.dirname(os.path.dirname(__file__)), 'bin', 'slowadd.py'))
    cmd = ["env", "PYTHONPATH={0}".format(':'.join(sys.path)),"python", path_to_exe, str(lhs), str(rhs)]
    for line in execute_with_updates(cmd):
        print(line.rstrip())
        try:
            app.sock.send(line.rstrip(), to=session_id)
        except IOError as err:
            print(str(err))
        except OSError as err:
            print(str(err))
            
    del app.SESSION_TO_SID[session_id]

@APP.route('/add2', methods=['GET', 'POST'])
def add2():
    """
    The request will have Left Hand Side and Right Hand Side arguments.
    Sum them and save the result  
    """
    print("VISITOR:", request.remote_addr)
    data = request.json

    lhs = float(data.get('lhs'))
    rhs = float(data.get('rhs'))
    session_id = data.get('session_id')

    return {'lhs':lhs, 'rhs':rhs, 'session_id':session_id}
