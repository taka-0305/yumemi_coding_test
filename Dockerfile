FROM node:18-alpine

WORKDIR /app

COPY src/package.json src/package-lock.json ./

RUN npm install

COPY src .

CMD ["npm", "run", "dev", "--", "--host"]
