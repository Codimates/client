FROM node:18-alpine

WORKDIR /app

# COPY package.json package-lock.json ./
COPY package*.json ./

RUN npm install
RUN npm i socket.io-client

COPY . .

RUN npm run build

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
