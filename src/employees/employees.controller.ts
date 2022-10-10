import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EmployeesDto, EmployeesService } from '.';

@Controller('employees')
export class EmployeesController {
    constructor(private employeeService: EmployeesService) {}
  
    @ApiBody({ type: EmployeesDto })
    @ApiOperation({
      summary: 'Add new Employee',
      operationId: 'AddEmployee',
    })
    @ApiResponse({ status: 200, type: EmployeesDto })
    @Post()
    async create(@Body() job: EmployeesDto): Promise<EmployeesDto> {
      return this.employeeService.create(job);
    }
  
    @ApiOperation({ summary: 'Get all Employee', operationId: 'GetEmployees' })
    @ApiResponse({ status: 200, type: EmployeesDto })
    @Get()
    async findAll(): Promise<EmployeesDto[]> {
      return this.employeeService.findAll();
    }
  
    @ApiOperation({ summary: 'Get Employee by id', operationId: 'GetEmployee' })
    @ApiResponse({ status: 200, type: EmployeesDto })
    @Get(':EmployeeID')
    async findOne(@Param('EmployeeID') id: number): Promise<EmployeesDto> {
      const res = await this.employeeService.findOne(id);
      if (!res) {
        throw new NotFoundException('Employee ID not found');
      }
      return res;
    }
    @ApiOperation({
      summary: 'Update Employee by id',
      operationId: 'UpdateEmployee',
    })
    @ApiResponse({ status: 200, type: EmployeesDto })
    @Put(':EmployeeID')
    async update(@Param('EmployeeID') id: number, @Body() job: EmployeesDto) {
      return this.employeeService.update(id, job);
    }
  
    @ApiOperation({
      summary: 'Delete Employee by id',
      operationId: 'DeleteEmployee',
    })
    @ApiResponse({ status: 200, type: EmployeesDto })
    @Delete(':EmployeeID')
    async delete(@Param('EmployeeID') id: number) {
      return this.employeeService.deleteOne(id);
    }
  
}
