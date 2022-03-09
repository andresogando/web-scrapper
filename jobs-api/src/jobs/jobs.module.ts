import { CacheModule, Module } from '@nestjs/common';
import { DynamoService } from 'src/db';
import { JobController } from './jobs.controller';
import { JobsService } from './jobs.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [JobController],
  providers: [JobsService, DynamoService],
  exports: [JobsService],
})
export class JobsModule {}
