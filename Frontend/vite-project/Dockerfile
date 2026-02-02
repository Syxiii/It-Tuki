FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache bash git openssh python3 make g++

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3001

CMD ["sh", "-c", "npm run build"]
