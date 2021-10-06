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


@APP.route('/add2', methods=['GET', 'POST'])
def add2():
    """
    The request will have Left Hand Side and Right Hand Side arguments.
    Sum them and save the result  
    """

    data = request.json
    lhs = float(data.get('lhs'))
    rhs = float(data.get('rhs'))
    result = lhs + rhs
    print(request.__dict__)

    return {'lhs':lhs, 'rhs':rhs, 'result':result}
              
                 
                                   

    print("Entry Point!")
    return {}


