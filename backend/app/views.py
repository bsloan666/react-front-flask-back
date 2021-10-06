# Author: bsloan 
"""
    Standard Flask Application endpoints
"""
import threading
import os
import json
import subprocess
import sys
from flask import Blueprint, render_template, request


APP = Blueprint('app', __name__,
                template_folder='templates',
                static_folder='static')


class SessionCache:
    """
    Disk-based cache for results of a slow computation 
    """
    def __init__(self, session_id):
        self.fname = "/var/tmp/app_session/{0}.txt".format(session_id)
        
    def save_result(self, output):
        """
        Saves the output of a process in a text file with a unique session name 
        """
        if not os.path.exists(os.path.dirname(self.fname)):
            os.makedirs(os.path.dirname(self.fname))
        if not os.path.exists(self.fname):
            with open(self.fname, 'w') as handle:   
                handle.write(output)
        else:        
            with open(self.fname, 'a') as handle:   
                handle.write(output)
        return True

    def load_result(self):
        """
        Loads content from a session cache 
        """
        if os.path.exists(self.fname):
            with open(self.fname, 'r') as handle:
                output = handle.read()
                return output
        return ""

    def delete_result(self):
        """
        deletes the session cache file
        """
        if os.path.exists(self.fname):
            os.remove(self.fname)
            return True
        return False


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


def command_processor(lhs, rhs, session_id):
    """
    Threaded worker that runs 
    """
    path_to_exe = os.path.abspath(os.path.join(os.path.dirname(os.path.dirname(__file__)), 'bin', 'slowadd.py')) 
    cmd = ["python", path_to_exe, str(lhs), str(rhs)]
    scache = SessionCache(session_id)
    for line in execute_with_updates(cmd):
        scache.save_result(line)
    scache.delete_result()    


@APP.route('/add2', methods=['GET', 'POST'])
def add2():
    """
    The request will have Left Hand Side and Right Hand Side arguments.
    Sum them and save the result  
    """

    data = request.json
    lhs = float(data.get('lhs'))
    rhs = float(data.get('rhs'))
    session_id = data.get('session_id')

    threading.Thread(target=command_processor,
                     args=(lhs, rhs, session_id),
                     daemon=True).start()

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
    scache = SessionCache(session_id)
    logging = scache.load_result()
    return {"output":logging, "session_id":session_id} 

