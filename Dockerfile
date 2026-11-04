FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
COPY css /usr/share/nginx/html/css
COPY js /usr/share/nginx/html/js
CMD ["/bin/sh", "-c", "sed -i 's/listen       80;/listen '${PORT}';/g; s/listen  \[::\]:80;/listen  [::]:'${PORT}';/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
