FROM node:14.17.3-buster

WORKDIR /web_ui

EXPOSE 3000

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY ./src ./src 
COPY ./public ./public 

RUN npm install --legacy-peer-deps

#CMD ["npm","run","start"]
