FROM node
WORKDIR /usr/src/app
COPY ./dist ./dist
COPY ./package.json ./
COPY ./.env ./
RUN npm install
EXPOSE 5001
CMD [ "npm", "start" ]
