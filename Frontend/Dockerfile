FROM node:20-alpine AS frontend-build

WORKDIR /app    

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine as production

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend-build /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]