import { Module } from '@nestjs/common';
import { SQS } from 'aws-sdk';
import { HttpService } from './http.service';
import { QueueService } from './queue.service';

@Module({
  imports: [],
  providers: [
      { provide: 'IHttpService', useClass: HttpService },
      { provide: 'IQueueService', useClass: QueueService },
      { 
          provide: SQS, useFactory: () => new SQS({ 
              region: 'us-east-1',
              apiVersion: '2012-11-05'
            }) 
      }
  ],
})
export class SharedModule {}