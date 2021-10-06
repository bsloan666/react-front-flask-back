# Author: bsloan 
"""
    Standard Flask Application endpoints
"""
import os
import json
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
        handle = open(self.fname, 'w')
        handle.write(output)
        handle.close()
        return True

    def load_result(self):
        """
        Loads content from a session cache 
        """
        if os.path.exists(self.fname):
            handle = open(self.fname, 'r')
            ouptut = handle.read()
            handle.close()
            return ouptut
        return ""

    def delete_result(self):
        """
        deletes the session cache file
        """
        if os.path.exists(self.fname):
            os.remove(self.fname)
            return True
        return False


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
    result = lhs + rhs
    print(request.__dict__)

    return {'lhs':lhs, 'rhs':rhs, 'result':result, 'session_id':session_id}
              
                 
                                   

    print("Entry Point!")
    return {}


