import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DynamoService } from './db';
import { JobsModule } from './jobs';
import { JobController } from './jobs/jobs.controller';

@Module({
  imports: [JobsModule, DynamoService],
  controllers: [AppController, JobController],
  providers: [AppService],
})
export class AppModule {}
