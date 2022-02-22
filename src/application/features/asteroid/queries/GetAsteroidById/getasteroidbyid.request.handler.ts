import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { IAsteroidRepository } from "../../../../../application/services/asteroid.repository";
import { GetAsteroidByIdRequest } from "./getasteroidbyid.request";

@QueryHandler(GetAsteroidByIdRequest)
export class GetAsteroidByIdRequestQueryHandler implements IQueryHandler<GetAsteroidByIdRequest> {

    constructor(@Inject('IAsteroidRepo') private readonly asteroidRepo: IAsteroidRepository) {

    }

    execute(query: GetAsteroidByIdRequest): Promise<any> {
        return this.asteroidRepo.get(query.id);
    }
}