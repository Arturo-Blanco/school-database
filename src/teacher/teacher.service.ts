import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTeacherAddressDto, CreateTeacherDto, UpdateTeacherAddressDto, UpdateTeacherDto } from './dto/teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CityService } from 'src/city/city.service';
import { City } from 'src/city/entities/city.entity';
import { TeacherAddress } from 'src/city/entities/teacher.address.entity';

@Injectable()
export class TeacherService {

  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(TeacherAddress)
    private readonly teacherAddressRepository: Repository<TeacherAddress>,
    private readonly cityService: CityService
  ) { }

  async createTeacher(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    const { name, surname } = createTeacherDto;
    try {
      const newTeacher: Teacher = new Teacher(name, surname);
      if (!newTeacher) {
        throw new Error('Error adding new teacher.');
      }
      return await this.teacherRepository.save(newTeacher);

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: error.message,
      }, HttpStatus.CONFLICT);
    }
  }

  async addTeacherAddress(createTeacherAddressDto: CreateTeacherAddressDto): Promise<string> {
    const { address, teacherId, cityId } = createTeacherAddressDto;
    try {
      const teacher: Teacher = await this.findById(teacherId);
      const city: City = await this.cityService.findById(cityId);

      const newTeacherAddress: TeacherAddress = new TeacherAddress(address, teacher.getId(), city.getId());
      if (!newTeacherAddress) {
        throw new Error(`Error assigning the address to the teacher.`);
      }
      await this.teacherAddressRepository.save(newTeacherAddress);
      return `Teacher ${teacher.getSurname()} ${teacher.getName()}, was assigned the ${address} address.`;

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: error.message,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  async findById(teacherId: number): Promise<Teacher> {
    try {
      const teacherCriteria: FindOneOptions = { where: { id: teacherId } };
      const teacher: Teacher = await this.teacherRepository.findOne(teacherCriteria);
      if (!teacher) {
        throw new Error(`There is no teacher with id : ${teacherId}.`);
      }
      return teacher;

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message
      }, HttpStatus.BAD_REQUEST);
    }
  }

  async findWithRelation(teacherId: number): Promise<Teacher> {
    try {
      const teacherCriteria: FindOneOptions = { where: { id: teacherId }, relations: ['teacherAddress'] };
      const teacher: Teacher = await this.teacherRepository.findOne(teacherCriteria);
      if (!teacher) {
        throw new Error(`There is not teacher with id : ${teacherId}.`);
      }
      return teacher;

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message
      }, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Teacher[]> {
    try {
      const teacherCriteria: FindManyOptions = { relations: ['teacherAddress']};
      const teachers: Teacher[] = await this.teacherRepository.find(teacherCriteria);
      if (!teachers) {
        throw new Error(`Error getting teachers.`);
      }
      return teachers;

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message
      }, HttpStatus.BAD_REQUEST);
    }
  }

  async updateTeacher(teacherId: number, updateTeacherDto: UpdateTeacherDto): Promise<string> {
    const { name, surname } = updateTeacherDto;
    try {
      const teacher: Teacher = await this.findById(teacherId);
      if (name) {
        teacher.setName(name);
      }
      if (surname) {
        teacher.setSurname(surname);
      }
      await this.teacherRepository.save(teacher);
      return `Teacher ${teacher.getSurname()} ${teacher.getName()} was edited.`;

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        message: 'Error updating student ' + error.message
      }, HttpStatus.CONFLICT);
    }
  }

  async updateTeacherAddress(teacher_Id: number, updateTeacherAddress: UpdateTeacherAddressDto): Promise<string> {
    const { address, cityId } = updateTeacherAddress;
    try {
      const teacher: Teacher = await this.findById(teacher_Id);
      const city: City = await this.cityService.findById(cityId);

      const teacherAddresCriteria : FindOneOptions = {where : {teacher_id : teacher_Id}};
      const teacherAddress : TeacherAddress = await this.teacherAddressRepository.findOne(teacherAddresCriteria);

      if(!teacherAddress) {
        throw new Error('The teacher does not have a valid address');
      }

      if(address) {
        teacherAddress.setAddress(address);
      }
      if(cityId) {
        teacherAddress.setCityId(city.getId());
      }
      await this.teacherAddressRepository.save(teacherAddress);
      return `Teacher ${teacher.getSurname()} ${teacher.getName()} address was  edited.`;

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: error.message,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  async removeTeacher(teacherId: number): Promise<string> {
    try {
      const teacher: Teacher = await this.findById(teacherId);
      await this.teacherRepository.remove(teacher);
      return `Teaacher with id ${teacherId} was removed.`

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        message: 'Error removing teacher. ' + error.message
      }, HttpStatus.CONFLICT);
    }
  }
}
