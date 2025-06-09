# weatherapi

simple weather api

run npm install to get the dependencies

run the following docker command to utilize the compose file:
docker-compose up --build

This should kick off the node app in one container, and the redis container should start up
as it will be labeled as a dependency. then using the host and port we build the uri
and they can talk to each other.
Its just a local instance, so the cache will be wiped out when the container is stopped/removed
