import { Controller, Get, Param, Query } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { GetAllAsteroidsRequest } from "../application/features/asteroid/queries/GetAllAsteroids/getallasteroids.request";
import { GetAsteroidByIdRequest } from "../application/features/asteroid/queries/GetAsteroidById/getasteroidbyid.request";

@Controller('asteroid')
export class AsteroidController {
    constructor(private readonly queryBus: QueryBus) {
    }

    @Get()
    async getAllAsteroids(@Query('page') page: number, @Query('limit') limit: number) {
      let query: GetAllAsteroidsRequest = new GetAllAsteroidsRequest();
      query.limit = limit;
      query.page = page;

      return await this.queryBus.execute(query);
    }
    
    @Get(':id')
    async getAsteroidById(@Param('id') asteroidId: string) {
        let query: GetAsteroidByIdRequest = new GetAsteroidByIdRequest();
        query.id = asteroidId;

        return await this.queryBus.execute(query);
    }
}