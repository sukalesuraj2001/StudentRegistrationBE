import { Controller, Post, Body, Get, Param, Delete, Patch } from '@nestjs/common';
import { CrudService } from './crud.service';
import { Student } from './entities/studententity';


@Controller('crud')
export class CrudController {
  constructor(private readonly crudService: CrudService) {}

  @Get()
  getAllStudents() {
    return this.crudService.findAll();
  }

  @Get(':id')
  getStudent(@Param('id') id: number) {
    return this.crudService.findOne(id);
  }

  @Post()
  createStudent(@Body() item: Student) {
    return this.crudService.create(item);
  }

  @Patch(':id')
  updateStudent(@Param('id') id: number, @Body() item: Partial<Student>) {
    return this.crudService.update(id, item);
  }

  @Delete(':id')
  deleteStudent(@Param('id') id: number) {
    return this.crudService.delete(id);
  }
}
