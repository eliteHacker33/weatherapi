#No time to deal with version dependency issues
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the application source code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# the command to start the application
CMD [ "npm", "start" ]