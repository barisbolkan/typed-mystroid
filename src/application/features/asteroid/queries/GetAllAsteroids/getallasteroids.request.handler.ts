import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { IAsteroidRepository } from "../../../../../application/services/asteroid.repository";
import { GetAllAsteroidsRequest } from "./getallasteroids.request";

@QueryHandler(GetAllAsteroidsRequest)
export class GetAllAsteroidsRequestQueryHandler implements IQueryHandler<GetAllAsteroidsRequest> {

    constructor(@Inject('IAsteroidRepo') private readonly asteroidRepo: IAsteroidRepository) {

    }

    execute(query: GetAllAsteroidsRequest): Promise<any> {
        const page = query.page === undefined || query.page < 0 ? 0 : query.page;
        const limit = query.limit === undefined || query.limit < 0 || query.limit > 100 ? 100 : query.limit;

        return this.asteroidRepo.getAll(page, limit);
    }
}