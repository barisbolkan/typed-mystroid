import { Injectable } from "@nestjs/common";
import { Asteroid } from "../../domain/entities/asteroid.entity";
import { IAsteroidRepository } from "../../application/services/asteroid.repository";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class AsteroidRepository implements IAsteroidRepository {

    constructor(@InjectModel(Asteroid.name) private readonly _context: Model<Asteroid>) {
    }

    async bulk(asts: Asteroid[]): Promise<void> {
        const bulkData = asts.map(item => (
            {
                replaceOne: {
                    upsert: true,
                    filter: {
                        _id: item._id
                    },
                    replacement: item
                }
            }
        ));
        return await this._context.bulkWrite(bulkData).then();
    }

    async get(id: any): Promise<Asteroid> {
        return await this._context.findById(id).exec();
    }
    
    async getAll(page: number, limit: number): Promise<Asteroid[]> {
        return await this._context.find().sort('name').skip(page * limit).limit(limit).exec();
    }

    async add(org: Asteroid): Promise<Asteroid> {
        return await this._context.create(org);
    }
}