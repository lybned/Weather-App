# Stage 1: Build React App
FROM node:latest AS build

WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY vite-project/package*.json ./

# Install dependencies
RUN npm update

# Copy all the app files to the working directory
COPY vite-project .

# Build the React app
RUN npm run build

# Stage 2: Serve React App using NGINX
FROM nginx:alpine

# Copy the built React app from the build stage to NGINX's default public directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

#
# # Nginx is automatically started by the parent image


#using the .NET 6 SDK as the base image
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the project files to the container
COPY ./Backend/WeatherBackend ./

# Build the project
RUN dotnet publish -c Release -o out

# Create the runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime
WORKDIR /app
COPY --from=build /app/out .
ENV ASPNETCORE_URLS=http://*:5186
ENTRYPOINT ["dotnet", "WeatherBackend.dll"]