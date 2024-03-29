# Stage 1 - the build process
FROM node:14 as build-ui

WORKDIR /src
ADD package.json package-lock.json .npmrc /src/

RUN NG_CLI_ANALYTICS=ci npm ci

ADD . /src

RUN npm run build.rcs.themes

# Stage 2 - the production environment
FROM nginx:1.13.9-alpine

EXPOSE 80

ARG BUILD_VERSION
ENV BUILD_VERSION ${BUILD_VERSION}

# apps
ENV ANDROID_PKG_NAME "secure.banking.forgerock.financial"
ENV IOS_APP_ID "secure.banking.forgerock.financial"

RUN rm -rf /etc/nginx/conf.d
COPY --from=build-ui /src/dist /usr/share/nginx
COPY projects/rcs/docker/nginx.conf /etc/nginx/conf.d/default.conf
# Android, iOS specific files (only for forgerock customer)
COPY projects/rcs/docker/.well-known /usr/share/nginx/html/.well-known
COPY projects/rcs/docker/start.sh /opt/start.sh

CMD ["/opt/start.sh"]
