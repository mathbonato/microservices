import client, { Channel, Connection } from "amqplib";

export class RabbitMQService {
    async connection() {
        const connection = await client.connect(
            "amqp://guest:guest@localhost:5672"
        );
        return connection;
    }

    async publish(payload: any): Promise<boolean> {
        const dataBuffer = Buffer.from(JSON.stringify(payload));
        const connection = await this.connection();
        const channel: Channel = await connection.createChannel();
        // Makes the queue available to the client
        await channel.assertQueue("yourbank");
        //Send a message to the queue
        return channel.sendToQueue("yourbank", dataBuffer);
    }
}
