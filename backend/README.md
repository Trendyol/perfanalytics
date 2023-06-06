## Perfanalytics backend 

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Init kafka topics

```bash
$ docker-compose up -d
$ docker-compose exec kafka kafka-topics --bootstrap-server broker:9092 --topic lh --create --replication-factor 1 --partitions 2
```