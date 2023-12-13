FROM node:21 AS builder

WORKDIR /app

COPY ./package.json .

COPY ./package-lock.json .

RUN ["npm", "install"]

COPY . .

RUN ["npm", "run", "build"]


FROM node:21-alpine as production

WORKDIR /app

COPY --from=builder /app/build ./build/

COPY --from=builder /app/package.json .

COPY --from=builder /app/package-lock.json .

COPY --from=builder /app/.sequelizerc .

EXPOSE 3001:3001

ENV JWT_SECRET=${JWT_SECRET}

ENV JWT_EXPIRATION=${JWT_EXPIRATION}

ENV POSTGRES_USER=${POSTGRES_USER}

ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}

ENV POSTGRES_DB=${POSTGRES_DB}

RUN ["npm", "install", "--production"]

ENTRYPOINT [ "npm", "run" ]

CMD [ "start" ]