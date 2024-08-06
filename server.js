const amqp = require('amqplib/callback_api');

function connectToRabbitMQ() {
  const url = 'amqp://user:doBdzwYNiNOjUcZz@127.0.0.1:5672/test';

  amqp.connect(url, (err, connection) => {
    if (err) {
      console.error(`Failed to connect to RabbitMQ: ${err.message}`);
      return;
    }

    connection.createChannel((err, channel) => {
      if (err) {
        console.error(`Failed to create channel: ${err.message}`);
        return;
      }

      const queue = 'test_queue';
      const msg = 'Hello RabbitMQ!';

      channel.assertQueue(queue, { durable: false });
      channel.sendToQueue(queue, Buffer.from(msg));

      console.log(`Sent message to ${queue}: ${msg}`);

      setTimeout(() => {
        connection.close();
      }, 500);
    });
  });
}

connectToRabbitMQ();
