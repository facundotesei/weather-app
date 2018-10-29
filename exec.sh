#!/usr/bin/env bash
docker build -t weather-app .
<<<<<<< HEAD
docker container run -p 3000:80  -it weather-app
=======
docker container run -p 3000:80  -it weather-app
>>>>>>> 8ad84be3c9b212d79b86c80e7fabc12192136196
