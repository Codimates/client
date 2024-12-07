FROM node:18-alpine as build

WORKDIR /app

# COPY package.json package-lock.json ./
COPY package*.json ./

RUN npm install
RUN npm i socket.io-client

COPY . .

RUN npm run build

# RUN npm install -g serve

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# CMD ["serve", "-s", "build", "-l", "3000"]
CMD ["nginx", "-g", "daemon off;"]