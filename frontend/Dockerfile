# pull official base image
FROM node:12.19.0

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . ./

# start app
CMD ["npm", "start"]


# docker build -t ybl-frontend:dev .

# docker run \
#    -it \
#    --rm \
#    -v ${PWD}:/app \
#    -v /app/node_modules \
#    -p 80:3000 \
#    -e CHOKIDAR_USEPOLLING=true \
#    ybl-frontend:dev