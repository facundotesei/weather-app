#!/usr/bin/env bash
docker build -t weather-app .
docker container run -p 3000:80  -it weather-app