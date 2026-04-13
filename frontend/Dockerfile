# Step 1: Build React app
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build


# Step 2: Serve with Nginx
FROM nginx:alpine

# remove default nginx site
RUN rm -rf /usr/share/nginx/html/*

# copy build files
COPY --from=build /app/dist /usr/share/nginx/html

# expose port 3000
EXPOSE 3000

# change nginx to listen on 3000
RUN sed -i 's/listen 80;/listen 3000;/g' /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]