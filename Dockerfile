FROM node:18

# Create app directory
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

# If debugging tests on linux, you can comment this out, and inspect machine with console
RUN yarn test

