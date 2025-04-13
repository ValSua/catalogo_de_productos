FROM node:22 AS build
WORKDIR /app

COPY package*.json ./

RUN npm install -g @angular/cli@19
RUN npm install

COPY . .

RUN ng build --configuration production

FROM nginx:alpine
COPY --from=build /app/dist/catalogo_de_productos /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80