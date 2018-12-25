# MQTT Bridge

Bridge two topics on two brokers (could actually be the same broker).

## Usage examples

Can for example be used to pull in sensor info from The Things Network to a local broker.

### The Things Network

For The Things Network you will need to configure the `source` as:

```yaml
source:
  connection: tcp://<host>:1883
  username: <app_id>
  password: <base64_key>
  topic: <app_id>/devices/<dev_id>/up
```

## Starting

The docker image is build automatically every time the repo is pushed to git.

Just run the docker compose:

```shell
docker-compose up -d
```

## Development

You can build an image:

```shell
docker build -t <image_name> .
```

And run it as follows:

```shell
docker run -it -v <path_to_config_file>:/home/node/app/config.yaml <image_name>
```