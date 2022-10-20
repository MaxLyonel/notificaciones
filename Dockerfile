FROM node
WORKDIR .
COPY package.json .
RUN npm install
COPY . .
EXPOSE 9191
CMD ["npm", "start"]

