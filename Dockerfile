FROM node:14-alpine as build
RUN apk add jq
WORKDIR /app
COPY ./scripts/replace-vars.sh ./replace-vars.sh
RUN ["chmod", "+x", "./replace-vars.sh"]
COPY package.json /app/
RUN npm install
COPY ./ /app/
ARG env=prod
RUN npm run build --bh ./
RUN ./replace-vars.sh




FROM nginx:1.19-alpine as final

RUN apk add gettext
WORKDIR /
COPY ./scripts/replace-env.sh ./replace-env.sh
RUN ["chmod", "+x", "/replace-env.sh"]

ENTRYPOINT ["/replace-env.sh"]

COPY --from=build /app/dist/todo-app /usr/share/nginx/html
