import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Student } from './entities/studententity';

@Injectable()
export class CrudService {
  constructor(
    @InjectRepository(Student)
    private readonly itemRepository: Repository<Student>,
  ) {}

  // Get all students
  findAll(): Observable<Student[]> {
    return from(this.itemRepository.find());
  }

  // Get a student by ID
  findOne(id: number): Observable<Student> {
    return from(this.itemRepository.findOneBy({ id })).pipe(
      map(student => {
        if (!student) {
          throw new NotFoundException(`Student with ID ${id} not found`);
        }
        return student;
      }),
      catchError(err => {
        throw err;
      }),
    );
  }

  // Create a new student
  create(item: Student): Observable<Student> {
    return from(this.itemRepository.findOneBy({ Email: item.Email })).pipe(
      switchMap(existingStudent => {
        if (existingStudent) {
          throw new ConflictException('Email already exists');
        }
        const newItem = this.itemRepository.create(item);
        return from(this.itemRepository.save(newItem));
      }),
      catchError(err => {
        throw err;
      }),
    );
  }
  
  // Update a student by ID
  async update(id: number, item: Partial<Student>): Promise<Observable<Student>> {
    const student = await this.itemRepository.findOneBy({ id });
    
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
  
    // Perform the update operation and return the updated entity
    return from(this.itemRepository.update(id, item)).pipe(
      switchMap(() => from(this.itemRepository.findOneBy({ id }))),
    );
  }
  

  // Delete a student by ID
  delete(id: number): Observable<{ message: string }> {
    return from(this.itemRepository.findOneBy({ id })).pipe(
      switchMap(student => {
        if (!student) {
          throw new NotFoundException(`Student with ID ${id} not found`);
        }
        return from(this.itemRepository.delete(id)).pipe(
          map(() => ({ message: `Student with ID ${id} has been deleted` }))
        );
      }),
      catchError(err => {
        throw err;
      }),
    );
  }
  
}
