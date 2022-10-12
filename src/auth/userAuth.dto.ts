import { ApiProperty } from '@nestjs/swagger';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export interface IUsers {
  id?: number;
  username?: string;
  password?: string;
  status: string;
  dateCreated: string;
  userType: string;
}

export class RegisterUsersDto implements IUsers {
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty()
  @Column({ unique: true })
  username?: string;

  @ApiProperty()
  @Column()
  password?: string;

  @ApiProperty()
  @Column()
  status: string;

  @ApiProperty()
  @Column()
  dateCreated: string;

  @ApiProperty()
  @Column()
  userType: string;
}

export class LoginUserDto implements IUsers {
  id?: number;
  status: string;
  dateCreated: string;
  userType: string;
  @ApiProperty()
  username?: string;
  @ApiProperty()
  password?: string;
}

export class RefreshDto {
  @ApiProperty({
    required: true,
    minLength: 5,
  })
  refresh_token: string;
}

export class AccessTokenDto {
  @ApiProperty({
    required: false,
    minLength: 5,
  })
  accessToken?: string;
  @ApiProperty({
    required: false,
    minLength: 5,
  })
  refreshToken?: string;
}
