import * as Amqp from 'amqp-ts';
import * as Redis from 'redis';

const connection = new Amqp.Connection('amqp://guest:guest@localhost:5672/');
const exchange = connection.declareExchange('messages', 'topic');
const queue = connection.declareQueue('get_qrcode');
queue.bind(exchange, 'transactions.qr_code');

const redisClient = Redis.createClient('redis://localhost:6379');

queue.activateConsumer(message => {
  console.log('Message received: ' + message.getContent());
  try {
    redisClient.lpush(message.getContent().transaction.id, JSON.stringify(message.getContent().transaction));
    message.ack();
  } catch (error) {
    console.error(error);
    message.reject();
  }
});

// create my own message
// connection.completeConfiguration().then(() => {
//   const message = {
//     transaction: {
//       id: '83e8a15d-1c76-4d77-91aa-bb0e3eb054a2',
//       qr_code: 'https%3A%2F%2Fgithub.com%2Fleoneves&chs=180x180&choe=UTF-8&chld=L|2',
//     },
//   };
//
//   const msg = new Amqp.Message(message);
//   exchange.send(msg, 'transactions.qr_code');
// });
