import { Asteroid } from "../../domain/entities/asteroid.entity";

export interface IAsteroidRepository {
    get(id): Promise<Asteroid>;
    getAll(page: number, limit: number): Promise<Asteroid[]>;
    add(ast: Asteroid): Promise<Asteroid>;
    bulk(asts: Asteroid[]): Promise<void>;
}