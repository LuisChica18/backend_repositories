import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';

@Injectable()
export class OrganizationService {

  private readonly logger = new Logger('OrganizationService');

  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ){}

  async create(createOrganizationDto: CreateOrganizationDto) {
    try {
      const organization = this.organizationRepository.create(createOrganizationDto);
      await this.organizationRepository.save(organization);
      return organization;
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
    
    const organization = await this.organizationRepository.preload({
      id_organization: id,
      ...updateOrganizationDto
    });

    if (!organization) 
      throw new NotFoundException(`Organization with id ${id} not found`);

    try {
      await this.organizationRepository.save(organization);  
    } catch (error) {
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
    throw new InternalServerErrorException(`Internal error. Report to admin system`)
  }
}
