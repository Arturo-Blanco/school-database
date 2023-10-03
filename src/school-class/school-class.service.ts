import { School } from './../school/entities/school.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSchoolClassDto, UpdateSchoolClassDto } from './dto/school-class.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { SchoolClass } from './entities/school-class.entity';
import { SchoolService } from 'src/school/school.service';
import { TeacherService } from 'src/teacher/teacher.service';
import { Teacher } from 'src/teacher/entities/teacher.entity';


@Injectable()
export class SchoolClassService {

  constructor(
    @InjectRepository(SchoolClass)
    private readonly schoolClassRepository: Repository<SchoolClass>,
    private readonly schoolService: SchoolService,
    private readonly teacherService: TeacherService
  ) { }

  async createSchoolClass(createSchoolClassDto: CreateSchoolClassDto): Promise<string> {
    const { name, schoolId, teacherId } = createSchoolClassDto;
    try {
      const school: School = await this.schoolService.findById(schoolId);
      const teacher: Teacher = await this.teacherService.findById(teacherId);
      const newSchoolClass: SchoolClass = new SchoolClass(name);
      if (!newSchoolClass) {
        throw new Error('Error adding new class.')
      }
      newSchoolClass.school = school;
      newSchoolClass.teacher = teacher;
      await this.schoolClassRepository.save(newSchoolClass);
      return `Class ${name} was added with teacher ${teacher.getSurname()} on school ${school.getName()}.`;

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        message: error.message
      }, HttpStatus.CONFLICT);
    }
  }

  async findById(schoolClassId: number): Promise<SchoolClass> {
    try {
      const classCritera: FindOneOptions = { where: { id: schoolClassId } };
      const schoolClass: SchoolClass = await this.schoolClassRepository.findOne(classCritera);
      if (!schoolClass) {
        throw new Error(`There is no class with id : ${schoolClassId}.`);
      }
      return schoolClass;

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message
      }, HttpStatus.BAD_REQUEST);
    }
  }

  async findWitRelations(schoolClassId: number): Promise<SchoolClass> {
    try {
      const classCritera: FindOneOptions = { where: { id: schoolClassId }, relations: ['teacher', 'school'] };
      const schoolClass: SchoolClass = await this.schoolClassRepository.findOne(classCritera);
      if (!schoolClass) {
        throw new Error(`There is no class with id : ${schoolClassId}.`);
      }
      return schoolClass;

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message
      }, HttpStatus.BAD_REQUEST);
    }
  }
  
  async findAll(): Promise<SchoolClass[]> {
    try {
      const classCritera: FindManyOptions = { relations: ['teacher', 'school'] };
      const schoolClasses: SchoolClass[] = await this.schoolClassRepository.find(classCritera);
      if (!schoolClasses) {
        throw new Error('There is no classes.')
      }
      return schoolClasses;

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message
      }, HttpStatus.BAD_REQUEST);
    }
  }

  async updateSchoolClass(schoolClassId: number, updateSchoolClassDto: UpdateSchoolClassDto): Promise<string> {
    const { name, schoolId, teacherId } = updateSchoolClassDto;
    try {
      const schoolClass: SchoolClass = await this.findById(schoolClassId);
      if (name) {
        schoolClass.setName(name);
      }
      if (schoolId) {
        const school: School = await this.schoolService.findById(schoolId);
        schoolClass.school = school;
      }
      if (teacherId) {
        const teacher: Teacher = await this.teacherService.findById(teacherId);
        schoolClass.teacher = teacher;
      }
      await this.schoolClassRepository.save(schoolClass);
      return `Class with id ${schoolClassId} was edited.`

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message
      }, HttpStatus.BAD_REQUEST);
    }
  }

  async removeSchoolClass(schoolClassId: number): Promise<string> {
    try {
      const schoolClass: SchoolClass = await this.findById(schoolClassId);
      await this.schoolClassRepository.remove(schoolClass);
      return `Class with id ${schoolClassId} was remove.`

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message
      }, HttpStatus.BAD_REQUEST);
    }
  }
}
