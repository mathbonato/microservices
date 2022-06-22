import client, { Channel, Connection, ConsumeMessage } from "amqplib";
import Transaction from "../../domain/entity/Transaction";
import TransactionRepository from "../repository/database/TransactionRepository";

export class RabbitMQService {
    async connection() {
        const connection = await client.connect(
            "amqp://username:password@localhost:5672"
        );
        return connection;
    }

    async publish(payload: any): Promise<boolean> {
        const dataBuffer = Buffer.from(JSON.stringify(payload));
        const connection = await this.connection();
        const channel: Channel = await connection.createChannel();
        await channel.assertQueue("yourbank");

        return channel.sendToQueue("yourbank", dataBuffer);
    }

    async consume(): Promise<void> {
        console.log("============== START CONSUMER ================")
        const connection = await this.connection();
        const channel: Channel = await connection.createChannel();
        await channel.assertQueue('yourbank2');

        const consumer = (channel: Channel) => async (message: ConsumeMessage | null): Promise<void> => {
            if (message) {
              console.log(message.content.toString())
              const data = JSON.parse(message.content.toString());
              const transaction = new Transaction('fees', data['fees'], 'Tarifa bancária', data['customerId']);
              const repository = new TransactionRepository();
              await repository.create(transaction);
              console.log(data);
              channel.ack(message);
            }
        }

        await channel.consume('yourbank2', consumer(channel));
    }
}
