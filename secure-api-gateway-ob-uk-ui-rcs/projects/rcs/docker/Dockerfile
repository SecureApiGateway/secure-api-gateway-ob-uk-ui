# Stage 1 - the build process
FROM node:20 as build-ui

WORKDIR /src
COPY secure-api-gateway-ob-uk-ui-common/ /src/secure-api-gateway-ob-uk-ui-common/
COPY secure-api-gateway-ob-uk-ui-cli/ /src/secure-api-gateway-ob-uk-ui-cli/
COPY secure-api-gateway-ob-uk-ui-rcs/ /src/secure-api-gateway-ob-uk-ui-rcs/

RUN cd /src/secure-api-gateway-ob-uk-ui-common && npm ci --legacy-peer-deps && npm run build
RUN cd /src/secure-api-gateway-ob-uk-ui-cli && npm ci
RUN cd /src/secure-api-gateway-ob-uk-ui-rcs && NG_CLI_ANALYTICS=ci npm ci --legacy-peer-deps && npm run build.rcs.themes

# Stage 2 - the production environment
FROM nginx:1.13.9-alpine

EXPOSE 80

ARG BUILD_VERSION
ENV BUILD_VERSION ${BUILD_VERSION}

# apps
ENV ANDROID_PKG_NAME "secure.banking.forgerock.financial"
ENV IOS_APP_ID "secure.banking.forgerock.financial"

RUN rm -rf /etc/nginx/conf.d
COPY --from=build-ui /src/secure-api-gateway-ob-uk-ui-rcs/dist /usr/share/nginx
COPY secure-api-gateway-ob-uk-ui-rcs/projects/rcs/docker/nginx.conf /etc/nginx/conf.d/default.conf
# Android, iOS specific files (only for forgerock customer)
COPY secure-api-gateway-ob-uk-ui-rcs/projects/rcs/docker/.well-known /usr/share/nginx/html/.well-known
COPY secure-api-gateway-ob-uk-ui-rcs/projects/rcs/docker/start.sh /opt/start.sh

CMD ["/opt/start.sh"]
