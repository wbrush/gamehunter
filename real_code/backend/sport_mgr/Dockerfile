# Install dependencies
FROM node:12-slim as dependencies
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .

# Build staging image
FROM dependencies
RUN npm run build
EXPOSE 3000
CMD npm run start