FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist/ /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]