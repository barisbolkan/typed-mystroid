import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { GetAllAsteroidsRequestQueryHandler } from "../application/features/asteroid/queries/GetAllAsteroids/getallasteroids.request.handler";
import { GetAsteroidByIdRequestQueryHandler } from "../application/features/asteroid/queries/GetAsteroidById/getasteroidbyid.request.handler";
import { Asteroid } from "../domain/entities/asteroid.entity";
import { AsteroidRepository } from "./database/asteroid.repository";
import { AsteroidSchema } from "./database/schemas/asteroid.schema";
import { HttpService } from "./shared/http.service";
import { QueueService } from "./shared/queue.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Asteroid.name, schema: AsteroidSchema },
        ]),
        MongooseModule.forRoot('mongodb+srv://babolkan:R39ojJx7ZFg3yb6T@copluk.ezbau.mongodb.net/mystroid'),
    ],
    providers: [
        { provide: 'IAsteroidRepo', useClass: AsteroidRepository },
        { provide: 'IHttpService', useClass: HttpService },
        { provide: 'IQueueService', useClass: QueueService },
        GetAsteroidByIdRequestQueryHandler,
        GetAllAsteroidsRequestQueryHandler
    ]
})
export class InfrastructureModule { }