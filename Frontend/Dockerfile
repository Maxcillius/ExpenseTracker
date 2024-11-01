FROM node:20-alpine AS frontend-build

WORKDIR /app    

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

RUN npm install -g serve

EXPOSE 5173
CMD ["serve", "-l", "5173", "-s", "dist"]