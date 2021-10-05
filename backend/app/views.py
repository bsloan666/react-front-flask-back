# Author: bsloan 
"""
    Standard Flask Application endpoints
"""
import os
import json
import sys
from .compose import generate_notes 
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

    if request.method == 'POST':

        if 'submit' in request.form:
            lhs = float(request.form.get('lhs'))
            rhs = float(request.form.get('rhs'))
            result = lhs + rhs
            print(request.__dict__)

            return {'result':result}
                  
                 
                                   

    print("Entry Point!")
    return {}


