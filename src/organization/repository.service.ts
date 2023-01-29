import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Metrics } from './entities/metrics.entity';
import { Organization } from './entities/organization.entity';
import { Repository as Repo } from './entities/repository.entity';
import { Tribe } from './entities/tribe.entity';

@Injectable()
export class RepositoryService {

  private readonly logger = new Logger('RepositoryService');

  constructor(
    @InjectRepository(Repo)
    private readonly repoRepository: Repository<Repo>,

    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,

    @InjectRepository(Tribe)
    private readonly tribeRepository: Repository<Tribe>,
  ){}


  findAll() {
    return this.repoRepository.find({});
  }

  async findByTribe(id_tribe: number) {

    const tribe = await this.tribeRepository.findOneBy({id_tribe});

    if (!tribe)
      throw new NotFoundException(`La Tribu no se encuentra registrada`);

    const repo = await this.organizationRepository.createQueryBuilder("orga")
    .leftJoinAndSelect(Tribe, "tribe", "tribe.idOrganizationIdOrganization = orga.id_organization")
    .leftJoinAndSelect(Repo, "repo", "repo.idTribeIdTribe = tribe.id_tribe")
    .leftJoinAndSelect(Metrics, "metrics", "metrics.id_repository = repo.id_repository")
    .where("repo.idTribeIdTribe = :id", { id: tribe.id_tribe})
    .getRawMany();

    if (!repo)
      throw new NotFoundException(`La Tribu no se encuentra registrada`);
    else {
/*
      repo.forEach(repo => {
        if (repo.metrics.coverage < 75) 
          throw new NotFoundException(`La Tribu no tiene repositorios que cumplan con la cobertura necesaria`);
      });
*/
    }

    return repo;
  }


  private handleExceptions(error:any){
    this.logger.error(error);
    throw new InternalServerErrorException(error.message)
  }
}
