FROM node:20

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port 8080
EXPOSE 8080

# Start the application
CMD ["npm", "start"]
