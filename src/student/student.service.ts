import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStudentDto, StudentAddressDto, StudentClassDto, UpdateStudentDto } from './dto/student.dto';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { StudentClass } from './entities/student.classes.entity';
import { StudentAddress } from 'src/city/entities/student.address.entity';
import { SchoolClass } from 'src/school-class/entities/school-class.entity';
import { City } from 'src/city/entities/city.entity';
import { CityService } from 'src/city/city.service';

@Injectable()
export class StudentService {

  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(StudentClass)
    private readonly studentClassRepository: Repository<StudentClass>,
    @InjectRepository(SchoolClass)
    private readonly schoolClassRepository: Repository<SchoolClass>,
    @InjectRepository(StudentAddress)
    private readonly studentAddressRepository: Repository<StudentAddress>,
    private readonly cityService: CityService
  ) { }

  async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
    const { name, surname, birthDate } = createStudentDto;
    try {
      const newStudent: Student = new Student(name, surname, birthDate);
      if (!newStudent) {
        throw new Error('Error adding new student.');
      }
      return await this.studentRepository.save(newStudent);

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: error.message,
      }, HttpStatus.CONFLICT);
    }
  }

  async addStudentClass(studentClassDto: StudentClassDto): Promise<string> {
    const { classId, studentId } = studentClassDto;
    try {
      const classCriteria: FindOneOptions = { where: { id: classId } };
      const schoolClass = await this.schoolClassRepository.findOne(classCriteria);
      if (!schoolClass) {
        throw new Error(`There is no class with id : ${classId}.`);
      }
      const student: Student = await this.findById(studentId);

      const newStudentClass: StudentClass = new StudentClass(studentId, classId);
      if (!newStudentClass) {
        throw new Error(`Error assigning the class to the student ${student.getSurname()} ${student.getName()}.`);
      }
      await this.studentClassRepository.save(newStudentClass);
      return `Student ${student.getSurname()} ${student.getName()}, was assigned the ${schoolClass.getName()} class.`;

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: error.message,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  async addStudentAddress(studentAddressDto: StudentAddressDto): Promise<string> {
    const { address, studentId, cityId } = studentAddressDto;
    try {
      const student: Student = await this.findById(studentId);
      const city: City = await this.cityService.findById(cityId);

      const newStudentAddress: StudentAddress = new StudentAddress(address, studentId, city.getId());
      if (!newStudentAddress) {
        throw new Error(`Error assigning the address to the student.`);
      }
      await this.studentAddressRepository.save(newStudentAddress);
      return `Student ${student.getSurname()} ${student.getName()}, was assigned the ${address} address.`;

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: error.message,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Student[]> {
    try {
      const studentCriteria: FindManyOptions = { relations: ['studentAddress', 'studentClass'] };
      const students: Student[] = await this.studentRepository.find(studentCriteria);
      if (!students) {
        throw new Error(`Error getting students.`);
      }
      return students;

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message
      }, HttpStatus.BAD_REQUEST);
    }
  }

  async findById(studentId: number): Promise<Student> {
    try {
      const studentCriteria: FindOneOptions = { where: { id: studentId } };
      const student: Student = await this.studentRepository.findOne(studentCriteria);
      if (!student) {
        throw new Error(`There is not student with id : ${studentId}.`);
      }
      return student;

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message
      }, HttpStatus.BAD_REQUEST);
    }
  }

  async findWithRelation(studentId: number): Promise<Student> {
    try {
      const studentCriteria: FindOneOptions = { where: { id: studentId }, relations: ['studentAddress', 'studentClass'] };
      const student: Student = await this.studentRepository.findOne(studentCriteria);
      if (!student) {
        throw new Error(`There is not student with id : ${studentId}.`);
      }
      return student;

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message
      }, HttpStatus.BAD_REQUEST);
    }
  }

  async updateStudent(studentId: number, updateStudentDto: UpdateStudentDto): Promise<string> {
    const { name, surname, birthDate } = updateStudentDto;
    try {
      const student: Student = await this.findById(studentId);
      if (name) {
        student.setName(name);
      }
      if (surname) {
        student.setSurname(surname);
      }
      if (birthDate) {
        student.setBirthDate(birthDate);
      }
      await this.studentRepository.save(student);
      return `Student ${student.getSurname()} ${student.getName()} was edited.`;

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        message: 'Error updating student ' + error.message
      }, HttpStatus.CONFLICT);
    }
  }

  async removeStudent(studentId: number): Promise<string> {
    try {
      const student: Student = await this.findById(studentId);
      await this.studentRepository.remove(student);
      return `Student with id ${studentId} was removed.`
      
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        message: 'Error removing student '+ error.message
      }, HttpStatus.CONFLICT);
    }
  }
}
