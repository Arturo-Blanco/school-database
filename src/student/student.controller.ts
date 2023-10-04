import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto, StudentAddressDto, StudentClassDto, UpdateStudentDto } from './dto/student.dto';
import { Student } from './entities/student.entity';
import { StudentClass } from './entities/student.classes.entity';
import { StudentAddress } from 'src/city/entities/student.address.entity';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) { }

  @Post('add')
  async getCreateStudent(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
    return await this.studentService.createStudent(createStudentDto);
  }

  @Post('addAddress')
  async getAddStudentAddress(@Body() studentAddressDto: StudentAddressDto): Promise<string> {
    return await this.studentService.addStudentAddress(studentAddressDto);
  }

  @Post('addClass')
  async getAddStudentClass(@Body() studentClassDto: StudentClassDto): Promise<string> {
    return await this.studentService.addStudentClass(studentClassDto);
  }

  @Get('search/:id')
  async getStudentById(@Param('id', ParseIntPipe) studentId: number): Promise<Student> {
    return await this.studentService.findById(studentId);
  }

  @Get('relation/:id')
  async getStudentRelations(@Param('id', ParseIntPipe) studentId: number): Promise<Student> {
    return await this.studentService.findWithRelation(studentId);
  }

  @Get('all')
  async getFindAll(): Promise<Student[]> {
    return await this.studentService.findAll();
  }

  @Get('studentClass/:studentId')
  async getFindStudentClass(@Param('studentId', ParseIntPipe) studentId: number): Promise<StudentClass | string> {
    return await this.studentService.findStudentClass(studentId);
  }

  @Get('studentAddress/:studentId')
  async getFindStudentAddress(@Param('studentId', ParseIntPipe) studentId: number): Promise<StudentAddress | string> {
    return await this.studentService.findAddress(studentId);
  }

  @Get('allAddress')
  async getFindAllAddress(): Promise<StudentAddress[] | string> {
    return await this.studentService.findAllAddress();
  }
  
  @Get('allClass')
  async getFindAllClass(): Promise<StudentClass[] | string> {
    return await this.studentService.findAllStudentClass();
  }

  @Patch('update/:id')
  async getUpdateStudent(@Param('id', ParseIntPipe) studentId: number, @Body() updateStudentDto: UpdateStudentDto): Promise<string> {
    return await this.studentService.updateStudent(studentId, updateStudentDto);
  }

  @Delete('remove/:id')
  async getRemoveStudent(@Param('id', ParseIntPipe) studentId: number): Promise<string> {
    return await this.studentService.removeStudent(studentId);
  }
}
