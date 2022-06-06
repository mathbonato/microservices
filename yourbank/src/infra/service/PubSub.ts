import { PubSub } from '@google-cloud/pubsub';
// import { pubsubConfig } from '../config/pubsub';

export class PubSubService {
    pubsub: PubSub;
    topicName: string;

    constructor () {
        this.pubsub = new PubSub({ projectId: 'yourbank' }); //yourbank
        this.topicName = 'mail-topic';
    }
    
    async publish(payload: any): Promise<string | undefined>  {
        const dataBuffer = Buffer.from(JSON.stringify(payload));
        try {
          const topic = this.pubsub.topic(this.topicName);
          const messageId = await topic.publishMessage({ data: dataBuffer });
          return messageId;
        } catch (error) {
          console.error(`Received error while publishing: ${error}`, error);
          return undefined;
        }
    }
}