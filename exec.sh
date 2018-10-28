#!/usr/bin/env bash
docker build -t weather-app .
docker container run -p 80:3000 -p -it weather-app
