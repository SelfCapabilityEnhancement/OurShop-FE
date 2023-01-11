FROM node:16.19-slim
WORKDIR /app
COPY ./yarn.lock /app
RUN yarn install --frozen-lockfile
ENTRYPOINT ["bash", "-c"]