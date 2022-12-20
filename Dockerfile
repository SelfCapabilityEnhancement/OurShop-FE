FROM node:16.19-slim
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
ENTRYPOINT ["bash", "-c"]