import { Media } from '../interfaces/media.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('profile')
export class MediaDto implements Media {
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty()
  @Column()
  mimeType: string;

  @ApiProperty({ required: false })
  @Column()
  filename: string;

  @Column({
    type: 'mediumblob',
  })
  data: Uint8Array;
}
