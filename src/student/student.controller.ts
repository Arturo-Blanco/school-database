import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto, StudentAddressDto, StudentClassDto } from './dto/student.dto';
import { Student } from './entities/student.entity';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) { }

  @Post('addStudent')
  async getCreateStudent(@Body() createStudentDto: CreateStudentDto) {
    return await this.studentService.createStudent(createStudentDto);
  }

  @Post('addStudentAddress')
  async getAddStudentAddress(@Body() studentAddressDto: StudentAddressDto) {
    return await this.studentService.addStudentAddress(studentAddressDto);
  }

  @Post('addStudentClass')
  async getAddStudentClass(@Body() studentClassDto: StudentClassDto) {
    return await this.studentService.addStudentClass(studentClassDto);
  }

  @Get(':id')
  async getStudentById(@Param('id', ParseIntPipe) studentId: number): Promise<Student> {
    return await this.studentService.getStudentById(studentId);
  }

  @Get('relation/:id')
  async getStudentRelations(@Param('id', ParseIntPipe) studentId: number): Promise<Student> {
    return await this.studentService.getStudentRelation(studentId);
  }
  @Get('all')
  async getFindAll(): Promise<Student[]> {
    return await this.studentService.findAll();
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto) {
    return this.studentService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}
