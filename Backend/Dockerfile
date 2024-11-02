FROM node:20-alpine AS backend-build

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install
RUN npm install -g typescript

COPY . .

RUN tsc -b

FROM node:20-alpine AS backend-runtime

WORKDIR /app

COPY --from=backend-build /app/dist ./dist
COPY --from=backend-build /app/package*.json ./

RUN npm install

EXPOSE 3000

CMD npx prisma migrate deploy && npx prisma generate && node ./dist/index.js