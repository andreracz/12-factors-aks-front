#!/bin/sh
#cat /app/dist/todo-app/assets/config.json
#cat /app/dist/todo-app/assets/config.deploy.json
jq -s '.[0] * .[1]' /app/dist/todo-app/assets/config.json /app/dist/todo-app/assets/config.deploy.json > /app/dist/todo-app/assets/config.new.json
#cat /app/dist/todo-app/assets/config.new.json
# remove configs
rm /app/dist/todo-app/assets/config.json 
