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
which will add the numbers and return a dictionary with the original pair and their sum. The frontend displays this
data as a json string. 

Motivation
----------

Well, to tell you the truth, this might be a trivial job for some people. Let's just say it took me the better part of two
evenings.

What I'm really intending to show is a solution to the problem of what to do when the backend computation takes a very long time.

It seems that browsers are unahappy waiting more than a minute or two for a response from a server. What I would like to demonstrate
is a way for the server to save the partial fruits of its computation in some kind of labelled cache so that when the frontend client
asks for a progress report (passing a session ID token it was given as a result of the initial call), the server can dump whatever it 
has in its labelled cache back to the client.

Running outside of Docker
-------------------------
To run the server, use:
```
cd backend
pipenv run gunicorn --worker-class eventlet -w 1  -b localhost:5000 'app_server:create_app()'
```

In a separate shell, start the client:
```
cd frontend
npm start
```

Very Finicky Dependencies
-------------------------
The Gunicorn and Eventlet version dependencies are strict: don't attempt to use versions other than the ones in Pipfile. 


