FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn set version berry

RUN yarn install

COPY . .

# RUN npm run build

CMD [ "yarn", "run", "start:dev" ]