#!/usr/bin/env python

"""
Add two numbers as excruciatingly slowly as possible
"""
import sys
import time
from excuses import EXCUSES 


if __name__ == "__main__":
    evaldict = {}
    evaldict['lhs'] = sys.argv[1]
    evaldict['rhs'] = sys.argv[2]
    evaldict['result'] = float(evaldict['lhs']) + float(evaldict['rhs'])

    accum = 0
    for excuse in EXCUSES:
        time.sleep(1)
        # caution! the flush option is critical here!
        print(excuse.format(**evaldict), flush=True)

