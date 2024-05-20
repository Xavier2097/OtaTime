FROM node:20-alpine 

WORKDIR /otatime
COPY package.json .
RUN npm install

COPY . .
CMD npm start