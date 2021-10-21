React Front Flask Back
======================

Not my most inventively named project
-------------------------------------

This project demonstrates a minimal React frontend communicating with a minimal flask API backend.

Getting Started
---------------
The extrmemly short version is:
```
docker-compose build
docker-compose up -d --force-recreate
```

This should create and launch a pair of docker containers -- a frontend called web_ui and a backend called app_server.
Pointing one's browser at localhost:3000 should present the user with a simple interface for entering a pair of numbers.
Pressing the "Request Sum" button should cause the react frontend to send the pair via a json packet to the backend,
which will very slowly add the two numbers and send progress updates roughly once per second to the frontend.  

Motivation
----------

Well, to tell you the truth, this might be a trivial job for some people. Let's just say it took me the better part of two
evenings. Editor's update: more like 5 evenings after replacing the simple polling scheme with one based on websockets. 

What I'm really intending to show is a solution to the problem of what to do when the backend computation takes a very long time.

It seems that browsers are unahappy waiting more than a minute or two for a response from a server. What I would like to demonstrate
is a way for the server to send the partial fruits of its computation (lines of logging in this case) to the frontend client as they become available.
As we are 

Very Finicky Dependencies
-------------------------
The Gunicorn and Eventlet version dependencies are strict: don't attempt to use versions other than the ones in the backend/Pipfile. 

