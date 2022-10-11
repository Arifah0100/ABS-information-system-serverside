import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeesDto } from '../entities/employees.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(EmployeesDto)
    private employeesRepository: Repository<EmployeesDto>,
  ) {}

  async create(application: EmployeesDto): Promise<EmployeesDto> {
    return this.employeesRepository.save(application);
  }
  async findAll(): Promise<EmployeesDto[]> {
    return this.employeesRepository.find();
  }
  async findOne(id: number): Promise<EmployeesDto> {
    return this.employeesRepository.findOneBy({ id });
  }
  async update(id: number, application: EmployeesDto) {
    return this.employeesRepository.update(id, application);
  }
  async deleteOne(id: number) {
    return this.employeesRepository.delete(id);
  }
}
