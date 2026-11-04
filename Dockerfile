FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
COPY css /usr/share/nginx/html/css
COPY js /usr/share/nginx/html/js
CMD printf 'server { listen %s; root /usr/share/nginx/html; index index.html; location / { try_files $$uri $$uri/ /index.html; } }\n' "$$PORT" > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
