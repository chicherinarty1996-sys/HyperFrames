FROM node:20-bookworm

ENV NODE_ENV=production
ENV PUPPETEER_SKIP_DOWNLOAD=true

RUN apt-get update \
  && apt-get install -y --no-install-recommends chromium ffmpeg ca-certificates fonts-liberation \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN mkdir -p out

EXPOSE 10000
CMD ["node", "server.js"]
