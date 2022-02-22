import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { IHttpService } from './application/services/ihttp.service';
import { IQueueService } from './application/services/iqueue.service';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

let cachedApp: INestApplication;
async function bootstrap() {
    if (!cachedApp) {
        cachedApp = await NestFactory.create(InfrastructureModule);
    }
    return cachedApp;
}

module.exports.handler = async (event, context, callback) => {
    const app = await bootstrap();

    // Get HttpService to communicate with the api
    const httpService: IHttpService = app.get('IHttpService');
    const queueService: IQueueService = app.get('IQueueService');
  
    let request = new URL('http://www.neowsapp.com/rest/v1/neo/browse?page=1&size=20&api_key=FB7MwHCyyGwKMfizb7PShbwfq6G0aqHqvnscMbtR');
    const resp = await httpService.get<{ page: { total_pages }}>(request.toString());
  
    // Queue related stuff
    const promises = [...Array(resp.page.total_pages)].map((val, idx, arr) => { 
      request.searchParams.set('page', idx.toString());

      return {
        url: request.toString()
      }; 
    }).map(queueService.send);
    await Promise.all(promises);
  
    await app.close();
}
