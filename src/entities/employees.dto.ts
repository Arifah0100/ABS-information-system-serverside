import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Employees } from 'src/interfaces/employees.interface';

@Entity('employees')
export class EmployeesDto implements Employees {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ default: '0821' })
  @Column()
  empID: string;

  @ApiProperty({ default: 'Basam' })
  @Column()
  firstName: string;

  @ApiProperty({ default: 'Cosain' })
  @Column()
  middleName: string;

  @ApiProperty({ default: 'Serad' })
  @Column()
  lastName: string;

  @ApiProperty({ default: '09/10/2022' })
  @Column()
  startDate: string;

  @ApiProperty({ default: 'WebApp' })
  @Column()
  department: string;

  @ApiProperty({ default: 'Developer' })
  @Column()
  position: string;

  @ApiProperty({ required: false })
  @Column()
  contactNumber: string;

  @ApiProperty({ required: false })
  @Column()
  emailAddress: string;

  @ApiProperty({ default: 'Male' })
  @Column()
  gender: string;

  @ApiProperty({ required: false })
  @Column()
  address: string;

  @ApiProperty({ required: false })
  @Column()
  profileId: string;
}
