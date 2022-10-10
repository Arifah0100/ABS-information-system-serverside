import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeesDto } from './index';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(EmployeesDto)
    private supplierRepository: Repository<EmployeesDto>,
  ) {}

  async create(application: EmployeesDto): Promise<EmployeesDto> {
    return this.supplierRepository.save(application);
  }
  async findAll(): Promise<EmployeesDto[]> {
    return this.supplierRepository.find();
  }
  async findOne(id: number): Promise<EmployeesDto> {
    return this.supplierRepository.findOneBy({id});
  }
  async update(id: number, application: EmployeesDto) {
    return this.supplierRepository.update(id, application);
  }
  async deleteOne(id: number) {
    return this.supplierRepository.delete(id);
  }
}
