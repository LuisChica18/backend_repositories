import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './entities/organization.entity';
import { Tribe } from './entities/tribe.entity';
import { Repository } from './entities/repository.entity';
import { Metrics } from './entities/metrics.entity';
import { RepositoryController } from './repository.controller';
import { RepositoryService } from './repository.service';

@Module({
  controllers: [OrganizationController, RepositoryController],
  providers: [OrganizationService, RepositoryService],
  imports: [
    TypeOrmModule.forFeature([Organization, Tribe, Repository, Metrics])
  ],
})
export class OrganizationModule {}
