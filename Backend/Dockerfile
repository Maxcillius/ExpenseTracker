FROM node:20-alpine AS backend-build

WORKDIR /app

COPY package*.json ./
RUN npm install

RUN npm install -g typescript
    
COPY . .

RUN tsc -b
    
EXPOSE 3000

CMD npx prisma migrate deploy && npx prisma generate && node ./dist/index.js