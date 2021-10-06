#!/usr/bin/env python

"""
Add two numbers as excruciatingly slowly as possible
"""
import sys
import time #sleep
from excuses import EXCUSES 



if __name__ == "__main__":
    evaldict = {}
    evaldict['lhs'] = sys.argv[1]
    evaldict['rhs'] = sys.argv[2]
    evaldict['result'] = float(evaldict['lhs']) + float(evaldict['rhs'])

    # let's make sure this takes around 150 seconds

    interval = 150/len(EXCUSES)

    for excuse in EXCUSES:
        time.sleep(interval)
        print(excuse.format(**evaldict))

