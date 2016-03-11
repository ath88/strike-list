strike-list
===========

Starting the required PostgreSQL database in docker can be done like this;

```
docker run -d \
    --name postgres-strike-list \
    -e POSTGRES_PASSWORD=password \
    -v /persistent/storage:/var/lib/postgresql/data \
    -p 5432:5432 \
    postgres:9.5.1
``
