import { InternalServerErrorException } from "@nestjs/common";
import * as AWS from "aws-sdk";
import { PaginationQueryDto, TechnologyQueryDto } from "src/common";
import { LocationQueryDto } from "src/common/dto/location-query.dto";
import {  sortBy } from "lodash";

export class DynamoService {
  constructor(private readonly client: AWS.DynamoDB, private key) {
    AWS.config.loadFromPath(__dirname + "/../../awsconfig.json");
    console.log("Connected!");
  }

  async findAll(params: PaginationQueryDto) {
    const { limit, offset } = params;
    let job;

    if (this.key) {
      return this.paginatedScan(this.key, limit);
    }

    try {
      const result = await new AWS.DynamoDB.DocumentClient()
        .scan({
          TableName: "Job",
          Limit: limit,
        })
        .promise();

      this.key = result.LastEvaluatedKey;
      job = result.Items;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }

    return { ok: true, data: job };
  }

  async findByLocation(locationQueryDto: LocationQueryDto) {
    const { limit, location, sort } = locationQueryDto;
    let job;

    if (this.key) {
      const params = {
        Limit: limit,
        FilterExpression: "contains(address, :cc)",
        ExpressionAttributeValues: {
          ":cc": location,
        },
      };
      return this.paginatedScan(this.key, params);
    }

    try {
      const result = await new AWS.DynamoDB.DocumentClient()
        .scan({
          TableName: "Job",
          FilterExpression: "contains(address, :cc)",
          ExpressionAttributeValues: {
            ":cc": location,
          },
          Limit: limit,
        })
        .promise();

      this.key = result.LastEvaluatedKey;
      job = result.Items;

      if (sort) {
        job = this.sortData(result.Items, sort);
      }
    } catch (err) {
      throw new InternalServerErrorException(err);
    }

    return { ok: true, data: job };
  }

  async findByTechnology(technologyQueryDto: TechnologyQueryDto) {
    const { limit, technology, sort } = technologyQueryDto;
    let job;

    if (this.key) {
      const params = {
        Limit: limit,
        FilterExpression: "contains(description, :cc)",
        ExpressionAttributeValues: {
          ":cc": technology,
        },
      };
      return this.paginatedScan(this.key, params);
    }

    try {
      const result = await new AWS.DynamoDB.DocumentClient()
        .scan({
          TableName: "Job",
          FilterExpression: "contains(description, :cc)",
          ExpressionAttributeValues: {
            ":cc": technology,
          },
          Limit: limit,
        })
        .promise();

      job = result.Items;
      this.key = result.LastEvaluatedKey;

      if (sort) {
        const tech = sort.toLowerCase() === "technology" ? "description" : sort;
        job = this.sortData(result.Items, tech);
      }
    } catch (err) {
      throw new InternalServerErrorException(err);
    }

    return { ok: true, data: job };
  }

  

  private async paginatedScan(key: any, queryParam?: any) {
    let job;
    try {
      const result = await new AWS.DynamoDB.DocumentClient()
        .scan({
          TableName: "Job",
          ExclusiveStartKey: key,
          ...queryParam,
        })
        .promise();

      job = result.Items;
      this.key = result.LastEvaluatedKey;

      if (queryParam.sortBy) {
        job = this.sortData(result.Items, queryParam.sortBy);
      }
    } catch (err) {
      throw new InternalServerErrorException(err);
    }

    return { StartingFromKey: key, data: job };
  }

  private sortData(data: any, iteratees: string) {
    return sortBy(data, [iteratees]);
  }
}
