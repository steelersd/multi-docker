# npm install may be needed
# docker build -t steelersd/complex-worker:1.0 -f Dockerfile.dev .

# If we want 'Hot Reload', we can create a volume to our
# current directory.
# docker run steelersd/complex-worker:1.0

FROM node:alpine

WORKDIR /app

COPY package.json ./
RUN npm install
COPY . ./

RUN npm install
CMD ["npm", "run", "start"]

