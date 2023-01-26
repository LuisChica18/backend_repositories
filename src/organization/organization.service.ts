import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';
import { Tribe } from './entities/tribe.entity';

@Injectable()
export class OrganizationService {

  private readonly logger = new Logger('OrganizationService');

  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,

    @InjectRepository(Tribe)
    private readonly tribeRepository: Repository<Tribe>,

    private readonly dataSource: DataSource,
  ){}

  async create(createOrganizationDto: CreateOrganizationDto) {
    try {

      const { tribes = [], ...organizationDetails } = createOrganizationDto;

      const organization = this.organizationRepository.create({
        ...organizationDetails,
        tribes: tribes.map( tribe => this.tribeRepository.create({name: tribe.name, status: tribe.status}))
      });
      await this.organizationRepository.save(organization);

      return {...organization, tribes: tribes};

    } catch (error) {
      this.handleExceptions(error);
    }


    return 'This action adds a new organization';
  }

  findAll() {
    return this.organizationRepository.find({});
  }

  async findOne(id_organization: number) {
    const organization = await this.organizationRepository.findOneBy({ id_organization });
    if (!organization)
      throw new NotFoundException(`Organization with id ${id_organization} not found`);

    return organization;
  }

  async update(id: number, updateOrganizationDto: UpdateOrganizationDto) {

    const { tribes, ...toUpdate } = updateOrganizationDto;
    
    const organization = await this.organizationRepository.preload({
      id_organization: id,
      ...toUpdate
    });

    if (!organization) 
      throw new NotFoundException(`Organization with id ${id} not found`);

    // Query Runner - Transactional
    const query = this.dataSource.createQueryRunner();
    await query.connect();
    await query.startTransaction();

    try {

      if (tribes)
        await query.manager.delete(Tribe, {id_organization : id });

      organization.tribes = tribes.map( tribe => this.tribeRepository.create({name: tribe.name, status: tribe.status}))

      await query.manager.save(organization);
      //await this.organizationRepository.save(organization);  

      await query.commitTransaction();
      await query.release;

      return organization;

    } catch (error) {

      await query.rollbackTransaction();
      await query.release;

      this.handleExceptions(error);
    }
    

    return organization;
  }

  async remove(id: number) {
    const organization = await this.findOne(id);
    await this.organizationRepository.remove(organization);
  }

  private handleExceptions(error:any){
    this.logger.error(error);
    throw new InternalServerErrorException(error.message)
  }
}
