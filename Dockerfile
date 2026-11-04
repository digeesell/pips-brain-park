FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
COPY css /usr/share/nginx/html/css
COPY js /usr/share/nginx/html/js
COPY start.sh /start.sh
RUN chmod +x /start.sh
CMD ["/start.sh"]
