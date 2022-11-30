FROM node:16.18.1-slim as test
WORKDIR /home/node/ourshop-fe
COPY . .
RUN yarn install --frozen-lockfile
RUN yarn test
