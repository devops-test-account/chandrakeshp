# Use Node.js image for development
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if present)
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port that Vite uses (default is 5173)
EXPOSE 3001

# Start the Vite development server
CMD ["npm", "run", "start"]