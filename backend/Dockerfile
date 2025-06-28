FROM node:18-slim

# Install Chromium and FFmpeg dependencies
RUN apt-get update && apt-get install -y \
  chromium \
  ffmpeg \
  fonts-liberation \
  libappindicator3-1 \
  libasound2 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libcups2 \
  libdbus-1-3 \
  libgdk-pixbuf2.0-0 \
  libnspr4 \
  libnss3 \
  libx11-xcb1 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  xdg-utils \
  wget \
  ca-certificates \
  --no-install-recommends && \
  apt-get clean

# Skip Puppeteer’s default Chromium download
ENV PUPPETEER_SKIP_DOWNLOAD=true

WORKDIR /app
COPY . .

RUN npm install

EXPOSE 8080

CMD ["node", "app.js"]
