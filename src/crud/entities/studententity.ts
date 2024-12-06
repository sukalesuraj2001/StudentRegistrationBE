import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

@Entity('student')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty({ message: 'Name is required' })
  Name: string;

  @Column()
  @IsEmail({}, { message: 'Email must be valid' })
  Email: string;

  @Column({ type: 'float' })
  @IsNumber({}, { message: 'Mobile must be a number' })
  Mobile: number;
}
