import { Injectable } from "@nestjs/common";
import { SQS } from "aws-sdk";
import { IQueueService } from "../../application/services/iqueue.service";

@Injectable()
export class QueueService implements IQueueService {

    constructor() {
    }

    send(msg: any): Promise<void> {
        return new SQS({ 
            region: 'us-east-1',
            apiVersion: '2012-11-05'
          })
          .sendMessage({ 
            MessageBody: JSON.stringify(msg),
            QueueUrl: 'https://sqs.us-east-1.amazonaws.com/847815818785/mystroid-streaming-queue'
        }).promise()
        .then();
    }

}