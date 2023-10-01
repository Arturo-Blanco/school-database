import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStudentDto, StudentAddressDto, StudentClassDto } from './dto/student.dto';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { StudentClass } from './entities/student.classes.entity';
import { StudentAddress } from 'src/city/entities/student.address.entity';
import { SchoolClass } from 'src/school-class/entities/school-class.entity';
import { City } from 'src/city/entities/city.entity';

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
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>
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
        throw new Error(`There is not class with id : ${classId}.`);
      }

      this.getStudentById(studentId);

      const newStudentClass: StudentClass = new StudentClass(studentId, classId);
      if (!newStudentClass) {
        throw new Error(`Error assigning the class to the student.`);
      }
      await this.studentClassRepository.save(newStudentClass);
      return `Student with id '${studentId}', was assigned the ${schoolClass.getName()} class.`;

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
      this.getStudentById(studentId);

      const cityCriteria: FindOneOptions = { where: { id: cityId } };
      const city: City = await this.cityRepository.findOne(cityCriteria);
      if (!city) {
        throw new Error(`There is not city with id :${cityId}.`);
      }
      const newStudentAddress: StudentAddress = new StudentAddress(address, studentId, cityId);
      if (!newStudentAddress) {
        throw new Error(`Error assigning the address to the student.`);
      }
      await this.studentAddressRepository.save(newStudentAddress);
      return `Student with id '${studentId}', was assigned the ${address} address.`
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: error.message,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Student[]> {
    try {
      const studentCriteria: FindManyOptions = { relations: ['students_address, students_classes'] };
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

  async getStudentById(studentId: number): Promise<Student> {
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

  async getStudentRelation(studentId: number): Promise<Student> {
    try {
      const studentCriteria: FindOneOptions = { where: { id: studentId }, relations: ['students_address, students_classes'] };
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

  update(id: number, updateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }

}
