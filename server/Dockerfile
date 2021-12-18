FROM ubuntu:14.04

# install Node.js and other dependencies
RUN apt-get update && \
  apt-get -y install curl && \
  apt-get -y install git && \
  apt-get -y install wget && \
  curl -fsSL https://deb.nodesource.com/setup_15.x | sudo -E bash - && \
  apt-get install -y --force-yes nodejs

# Install PM2
RUN npm install -g pm2

RUN mkdir -p /var/www/home-iptv

WORKDIR /var/www/home-iptv

ADD . /var/www/home-iptv

RUN npm install

# COPY docker-entrypoint.sh /
# ENTRYPOINT ["/docker-entrypoint.sh"]

# COPY . .
EXPOSE 3020

# RUN APP
CMD pm2 start --no-daemon processes.json