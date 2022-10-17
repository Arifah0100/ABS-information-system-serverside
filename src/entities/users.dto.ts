import { ApiProperty } from '@nestjs/swagger';
import { Users } from 'src/interfaces/users.interface';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EmployeesDto } from './employees.dto';

@Entity('user')
export class UsersDto implements Users {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ unique: true })
  username: string;

  @ApiProperty()
  @Column()
  password: string;

  @ApiProperty()
  @Column()
  status: string;

  @ApiProperty()
  @Column()
  dateCreated: string;

  @ApiProperty()
  @Column()
  userType: string;

  @Column({ length: 255, default: '', nullable: true })
  refreshToken?: string;

  @OneToOne(() => EmployeesDto)
  @JoinColumn()
  employee: EmployeesDto;
}
