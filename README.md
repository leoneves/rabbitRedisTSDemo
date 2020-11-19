# Rabitmq and Redis Demo
This is a poc to get a message from rabbitmq em put it in a list of Redis with id as a key.
Then another service is going to catch the message by blpop(Redis), thus blocking the thread until receive the message.
---
It uses these libraries:
+ amqp-ts
+ redis
