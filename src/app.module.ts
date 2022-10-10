import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  EmployeesDto,
  EmployeesService,
  EmployeesController,
} from './employees/index';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmployeesDto]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'absdb',
      entities: [EmployeesDto],
      synchronize: true,
      dropSchema: true,
    }),
    AuthModule,
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class AppModule {}
