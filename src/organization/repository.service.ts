import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, DataSource, Repository } from 'typeorm';
import { Metrics } from './entities/metrics.entity';
import { Repository as Repo } from './entities/repository.entity';
import { Tribe } from './entities/tribe.entity';

@Injectable()
export class RepositoryService {

  private readonly logger = new Logger('RepositoryService');

  constructor(
    @InjectRepository(Repo)
    private readonly repoRepository: Repository<Repo>,

    @InjectRepository(Metrics)
    private readonly metricsRepository: Repository<Metrics>,

    @InjectRepository(Tribe)
    private readonly tribeRepository: Repository<Tribe>,

    private readonly dataSource: DataSource,
  ){}


  findAll() {
    return this.repoRepository.find({});
  }

  async findByTribe(id_tribe: number) {

    const tribe = await this.tribeRepository.findOneBy({id_tribe});

    if (!tribe)
      throw new NotFoundException(`La Tribu no se encuentra registrada`);

    const repo = await this.repoRepository.createQueryBuilder("id_tribe")
    .leftJoinAndSelect(Metrics, "metrics", "metrics.id_repository = id_tribe.id_repository")
    .where("id_tribe.id_tribe = :id", { id: tribe.id_tribe})
    .getMany()

    const repo1 = await this.repoRepository.createQueryBuilder("id_tribe")
    .leftJoinAndSelect(Metrics, "metrics", "metrics.id_repository = id_tribe.id_repository")
    .where("id_tribe.id_tribe = :id", { id: tribe.id_tribe})
    .getSql();

    Logger.error(repo1);
  
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
