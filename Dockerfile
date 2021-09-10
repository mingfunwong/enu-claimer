# build base
  FROM node:lts-alpine AS base

  ENV NODE_ENV=production \
      APP_PATH=/app
  
  WORKDIR $APP_PATH

  RUN npm i nexe -g

  COPY ./package.json ./

  RUN yarn

  COPY ./src ./

  RUN nexe ./src -t alpine-64-10.14.0 -o ./start

# build app
  FROM scratch

  ENV NODE_ENV=production \
      APP_PATH=/app
  
  WORKDIR $APP_PATH

  COPY --from=base $APP_PATH/start ./

  # start up
  CMD ["./start"]