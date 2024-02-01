FROM node:18

# Create app directory
WORKDIR /app

RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get install -y ffmpeg

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

# If debugging tests on linux, you can comment this out, and inspect machine with console
RUN yarn test

