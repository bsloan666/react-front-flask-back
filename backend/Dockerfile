FROM python:3.9.7-buster 

WORKDIR /app

EXPOSE 5000
ENV PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
ENV PYTHONPATH = "/app"

RUN pip install pipenv

COPY ./Pipfile /app/Pipfile 
RUN pipenv lock --requirements > requirements.txt && \
    pip install -r requirements.txt

RUN mkdir -p /pids
RUN mkdir -p /var/tmp/app_session

# CMD ["uwsgi", "--http", "0.0.0.0:5000", "--master", "--wsgi-file", "/app/wsgi.py", "--ini", "/app/app_server.ini", "--http-to", "/tmp/app_server.sock"]
