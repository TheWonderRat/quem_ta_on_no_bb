FROM node:21-alpine AS frontend

COPY ./package.json ./

COPY ./package-lock.json ./

RUN ["npm", "install"]

COPY ./ ./

EXPOSE 3000:3000

ENTRYPOINT [ "npm" ]

CMD [ "start" ]