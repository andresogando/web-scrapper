import { Controller, Get, Query } from '@nestjs/common';
import {
  LocationQueryDto,
  PaginationQueryDto,
  TechnologyQueryDto,
} from 'src/common/dto';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.jobsService.findAll(paginationQuery);
  }

  @Get('/search/ByLocation')
  findByLocation(@Query() locationQueryDto: LocationQueryDto) {
    return this.jobsService.findByLocation(locationQueryDto);
  }

  @Get('search/ByTechnology')
  findyByTechnology(@Query() technologyQueryDto: TechnologyQueryDto) {
    return this.jobsService.findByTechnology(technologyQueryDto);
  }

  
}
