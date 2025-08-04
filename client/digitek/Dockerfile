# ./client/digitek/Dockerfile (updated)
FROM node:20-alpine

WORKDIR /app

# Install dependencies using npm (since you're using npm run dev)
COPY package*.json ./
RUN npm install

# Copy app files
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]