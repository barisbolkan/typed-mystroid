import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AsteroidController } from './controllers/asteroid.controller';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Module({
  imports: [
    InfrastructureModule,
    CqrsModule,
  ],
  controllers: [AsteroidController],
})
export class ApiModule { }