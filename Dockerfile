# Use an official Node runtime as the base image
FROM node:20.11.1-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./


# Update npm to the latest major version
RUN npm install -g npm@10.7.0


RUN npm install react-google-login@5.2.2 --force

RUN npm install gapi-script --force

# Install dependencies
RUN npm install --force


# Copy the rest of the application code to the working directory
COPY . .

# Build the React app for production
RUN npm run build

# Expose port 3000 to the outside world
EXPOSE 3000

# Command to run the React app
CMD ["npm", "start"]
