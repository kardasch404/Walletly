FROM node:20-alpine

WORKDIR /usr/src/Walletly/

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000

CMD ["npm", "start"]