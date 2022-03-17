# Needed stack for ADSI

Needed stack for Non-VM ADSI's mandatory practice using Docker.

This solution has been tested on Mac OS 12.3 for `DataIngestor`, `OnlineLayerLauncher` and `BatchLayerLauncher`, and the Docker daemon configured with 2 cores and 4 GB of RAM.

**Note that** Docker has to be installed in your machine.

## Stack

* Mongo
* Mongo-Express
* Zookeeper
* Kafka

## Setting up

Some changes are required within the Java project:

* Change `bootstrap.server` to point out to `localhost:29092`
* Change the Mongo's URL by: `mongodb://root:example@localhost:27017`
* Finally, add the following dependency in `pom.xml`:

    ```xml
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <version>1.4.2.RELEASE</version>
    </dependency>
    ```


## Running

Run with:
```
docker compose up
```

**Note that** Mongo credentials are `root:example`.

### Mongo Express

Use mongo-express to see the databases and the collections just browsing [http://localhost:8081](http://localhost:8081)

### Mongo command line

Access to mongo by command line (instead of using mongo-express) with:

```
docker exec -ti mongo mongo admin -u root -p 'example'
```

### Kafka

Use [kcat](https://github.com/edenhill/kcat) to check the topics' messages:
```
kcat -C -b localhost:29092 -t ingesta
```

And, for the metadata:
```
kcat -L -b localhost:29092  
```

**Note that** the Kafka's port is `29092` instead of `9092`. This is because of the `9092` port is used for communications from the Kafka's host itself.

## Clean up

Clean up with:
```
docker compose down
```
