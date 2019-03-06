# choose the base image to build upon
FROM node:10.14.2-alpine

# define working directory
WORKDIR /app/services/web

# copy files needed for installation...
COPY package*.json ./
COPY ./package.json package

# ... then install dependencies
RUN npm install --only=production

# add application code
COPY . .

# map docker daemon to the port this app uses
EXPOSE 8080

# run the app
CMD ["npm", "start"]
