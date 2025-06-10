# weatherapi

simple weather api

git clone the project to your local

#to run locally without docker
run npm install to get the dependencies

docker pull redis
docker run -d --name some-redis -p 6379:6379 redis:latest

npm start 
or
npm run start-dev to run using nodemon

#Easiest option

run the following docker command to utilize the compose file:
docker-compose up --build

This should kick off the node app in one container, and the redis container should start up
as it will be labeled as a dependency. then using the host and port we build the uri
and they can talk to each other.
Its just a local instance, so the cache will be wiped out when the container is stopped/removed

once the solution is up and running on your local, you can navigate to:
http://localhost:3000/api-docs/ and test the api and see the api documentation that way
