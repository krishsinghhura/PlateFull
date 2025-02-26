FROM node:latest

WORKDIR /app

COPY package.json .

RUN npm install
RUN npm install esbuild@latest --force


COPY . .

EXPOSE 5173

CMD ["npm","run","dev"]