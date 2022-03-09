import { CacheStore, CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { PaginationQueryDto, TechnologyQueryDto } from "src/common";
import { LocationQueryDto } from "src/common/dto/location-query.dto";
import { DynamoService } from "src/db";

@Injectable()
export class JobsService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: CacheStore,
    private readonly client: DynamoService
  ) {}

  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, sort } = paginationQuery;
    const cacheKey = limit + "_" + sort;
    const value: any = await this.cacheManager.get(cacheKey);

    if (value && value.data.lenght > 0) {
      return value;
    }

    const response = await this.client.findAll(paginationQuery);
    await this.cacheManager.set(cacheKey, response, { ttl: 100 });
    return response;
  }

  async findByLocation(locationQuery: LocationQueryDto) {
    const { limit, location, sort } = locationQuery;
    const cacheKey = location + "_" + limit + "_" + sort;
    const value: any = await this.cacheManager.get(cacheKey);

    if (value && value.data.length > 0) {
      return value;
    }

    const response = await this.client.findByLocation(locationQuery);
    await this.cacheManager.set(cacheKey, response, { ttl: 60 * 10 });
    return response;
  }

  async findByTechnology(technologyQuery: TechnologyQueryDto) {
    const { technology, limit, sort } = technologyQuery;
    const cacheKey = technology + "_" + limit + "_" + sort;
    const value: any = await this.cacheManager.get(cacheKey);

    if (value && value.data.length > 0) {
      return value;
    }

    const response = await this.client.findByTechnology(technologyQuery);
    await this.cacheManager.set(cacheKey, response, { ttl: 60 * 10 });
    return response;
  }
}
