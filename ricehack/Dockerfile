# Base image for the Next.js application
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package.json ./

# Install dependencies
RUN npm install 

# Copy the rest of the application files
COPY . .

# Expose the port the Next.js app runs on
EXPOSE 3000

# Start the application in development mode
CMD ["npm", "run", "dev"]
