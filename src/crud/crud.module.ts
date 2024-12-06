import { Module } from '@nestjs/common';
import { CrudController } from './crud.controller';
import { CrudService } from './crud.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/studententity';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  controllers: [CrudController],
  providers: [CrudService]
})
export class CrudModule {}
