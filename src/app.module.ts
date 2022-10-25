import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesController } from './employees/employees.controller';
import { EmployeesService } from './employees/employees.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { EmployeesDto } from './entities/employees.dto';
import { UsersDto } from './entities/users.dto';
import { MediaService } from './media/media.service';
import { MediaController } from './media/media.controller';
import { MediaDto } from './entities/media.dto';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmployeesDto, UsersDto, MediaDto]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'absdb',
      entities: [EmployeesDto, UsersDto, MediaDto],
      // synchronize: true,
      // dropSchema: true,
    }),
    AuthModule,
  ],
  controllers: [EmployeesController, UsersController, MediaController],
  providers: [EmployeesService, UsersService, MediaService],
})
export class AppModule {}
