FROM node:18-alpine
WORKDIR /frontend
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]


# build front-end
# FROM node:alpine as build
# WORKDIR /frontend
# ENV PATH /frontend/node_modules/.bin:$PATH
# COPY package.json /frontend/package.json
# RUN npm install --silent
# COPY . /frontend
# RUN npm run build

# # move builds to nginx and run the front-end
# FROM nginx:alpine
# COPY --from=build /frontend/build /usr/share/nginx/html
# RUN rm /etc/nginx/conf.d/default.conf
# COPY ./nginx/nginx.conf /etc/nginx/conf.d
# EXPOSE 3000
# CMD ["nginx", "-g", "daemon off;"]
