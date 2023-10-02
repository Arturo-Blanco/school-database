import { School } from './../school/entities/school.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSchoolClassDto } from './dto/school-class.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
      newSchoolClass.school_id = school.getId();
      newSchoolClass.teacher_id = teacher.getId();
      await this.schoolClassRepository.save(newSchoolClass);
      return `Class ${name} was added with teacher ${teacher.getSurname()} on school ${school.getName()}.`;

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        message: error.message
      }, HttpStatus.CONFLICT);
    }
  }

  findAll() {
    return `This action returns all schoolClass`;
  }

  findOne(id: number) {
    return `This action returns a #${id} schoolClass`;
  }

  update(id: number, updateSchoolClassDto) {
    return `This action updates a #${id} schoolClass`;
  }

  remove(id: number) {
    return `This action removes a #${id} schoolClass`;
  }
}
