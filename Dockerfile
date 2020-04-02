FROM nginx:alpine

COPY ./app/out /usr/share/nginx/html

EXPOSE 80

# docker build -t site .
# docker run -d -p 8000:80 --name web site
