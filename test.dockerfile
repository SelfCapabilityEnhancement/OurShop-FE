FROM node:16.18.1-slim
WORKDIR /home/node/ourshop-fe
COPY . .
CMD ["test"]
ENTRYPOINT ["npm"]
