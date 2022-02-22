import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Asteroid } from "../../domain/entities/asteroid.entity";
import { AsteroidRepository } from "./asteroid.repository";
import { AsteroidSchema } from "./schemas/asteroid.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Asteroid.name, schema: AsteroidSchema },
        ]),
        MongooseModule.forRoot('mongodb+srv://babolkan:R39ojJx7ZFg3yb6T@copluk.ezbau.mongodb.net/mystroid'),
    ],
    providers: [
        { provide: 'IAsteroidRepo', useClass: AsteroidRepository },
    ]
})
export class DatabaseModule { }