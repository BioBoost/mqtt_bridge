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

Copy `settings.example.yml` as `settings.yml` and fill it in.

Next run `npm start`.