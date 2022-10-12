import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UsersDto } from '../entities/users.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UsersController {
  constructor(
    private userRepository: UsersService,
    private authService: AuthService,
  ) {}

  @ApiBody({ type: UsersDto })
  @ApiOperation({ summary: 'Add new user', operationId: 'AddUser' })
  @ApiResponse({ status: 200, type: UsersDto })
  @Post('/create')
  create(@Body() user: UsersDto) {
    return this.authService.register(user);
  }

  @ApiOperation({
    summary: 'Get all Users',
    operationId: 'GetUsers',
  })
  @ApiResponse({ status: 200, type: [UsersDto] })
  @Get()
  async findAll(): Promise<UsersDto[]> {
    return this.userRepository.findAll();
  }

  @ApiOperation({
    summary: 'Get Users by id',
    operationId: 'GetUser',
  })
  @ApiResponse({ status: 200, type: UsersDto })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UsersDto> {
    return this.userRepository.findOne(id);
  }
  @ApiOperation({
    summary: 'Update User by id',
    operationId: 'UpdateUser',
  })
  @ApiResponse({ status: 200, type: UsersDto })
  @Put(':id')
  async update(@Param('id') id: number, @Body() job: UsersDto) {
    return this.userRepository.update(id, job);
  }

  @ApiOperation({
    summary: 'Delete User by id',
    operationId: 'DeleteUser',
  })
  @ApiResponse({ status: 200, type: UsersDto })
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.userRepository.deleteOne(id);
  }
}
