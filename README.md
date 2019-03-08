# usm.io render service

## Run

This package requires Node 10 to run properly. It is tested with Node v10.15.2.

### Run with npm

    $ npm start

starts the render service. Fairly easy, isn't it?

### Run dockerized

You can also run the render service within a container.

> Make sure you have docker installed on your system!

Then build the image with

    $ docker build -t usm.io .

Now you can run the container with

    $ docker run -p 5324:5324 usm.io

If you want to start and stop all services at once, you can do it via `docker-compose`. [See Docker docs for details](https://docs.docker.com/compose/).

## API

### Summary

Send json presentation of usm to
    
    POST /api/render/html
    
and receive `download_token` in exchange.

Use `download_token` to

    GET /api/download?token=<download_token>

and get rendered html representation of usm.

### Detailed documentation

The full api documentation can be found in [the service's test suite](service/tests/server.test.js).
