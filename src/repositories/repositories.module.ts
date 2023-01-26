import { Module } from '@nestjs/common';
import { RepositoriesController } from './repositories.controller';
import { RepositoriesService } from './repositories.service';

@Module({
  controllers: [RepositoriesController],
  providers: [RepositoriesService]
})
export class RepositoriesModule {}
