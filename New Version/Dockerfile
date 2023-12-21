# Stage 1: Build the React Frontend
FROM node:latest as frontend-build
WORKDIR /app
COPY vite-project/package.json vite-project/package-lock.json ./vite-project/
WORKDIR /app/vite-project
RUN npm install
COPY vite-project ./
RUN npm run build

# Stage 2: Serve the React Frontend using Nginx
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=frontend-build /app/vite-project/dist /usr/share/nginx/html
EXPOSE 80


