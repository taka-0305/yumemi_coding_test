FROM node:18-alpine

WORKDIR /app

COPY react-app/package.json react-app/package-lock.json ./

RUN npm install

COPY react-app .

CMD ["npm", "run", "dev", "--", "--host"]
