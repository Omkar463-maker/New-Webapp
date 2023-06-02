FROM nodejs

WORKDIR /New-Webapp

RUN apt install lynx

CMD [lynx, index.html]
