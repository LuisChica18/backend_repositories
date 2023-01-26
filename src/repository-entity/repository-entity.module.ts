import { Module } from '@nestjs/common';
import { RepositoryEntityService } from './repository-entity.service';
import { RepositoryEntityController } from './repository-entity.controller';

@Module({
  controllers: [RepositoryEntityController],
  providers: [RepositoryEntityService]
})
export class RepositoryEntityModule {}
