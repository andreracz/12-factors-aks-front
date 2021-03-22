#!/bin/sh

#Substitute all environment variables defined in the file given as argument
envsubst < /usr/share/nginx/html/assets/config.new.json > /usr/share/nginx/html/assets/config.json
# Execute all other parameters
nginx -g "daemon off;" 