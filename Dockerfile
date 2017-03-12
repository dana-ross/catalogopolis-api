FROM node:alpine
RUN apk add --update --no-cache sqlite
RUN mkdir /code
WORKDIR /code
ADD package.json /code
RUN npm install
ADD . /code
RUN node install.js
EXPOSE 5000
CMD ["node", "app/dist/bundle.js"]
