import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherAddressDto, CreateTeacherDto, UpdateTeacherDto } from './dto/teacher.dto';
import { Teacher } from './entities/teacher.entity';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) { }

  @Post('add')
  async getCreateTeacher(@Body() createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    return await this.teacherService.createTeacher(createTeacherDto);
  }

  @Post('addAddress')
  async getTeacherAddress(@Body() createTeacherAddressDto: CreateTeacherAddressDto): Promise<string> {
    return await this.teacherService.addTeacherAddress(createTeacherAddressDto);
  }

  @Get(':id')
  async getTeacherById(@Param('id', ParseIntPipe) teacherId: number): Promise<Teacher> {
    return await this.teacherService.findById(teacherId);
  }

  @Get('relation/:id')
  async getTeacherRelations(@Param('id', ParseIntPipe) teacherId: number): Promise<Teacher> {
    return await this.teacherService.findWithRelation(teacherId);
  }

  @Get('all')
  async getFindAll(): Promise<Teacher[]> {
    return await this.teacherService.findAll();
  }

  @Patch('update/:id')
  async getUpdate(@Param('id', ParseIntPipe) teacherId: number, @Body() updateTeacherDto: UpdateTeacherDto): Promise<string> {
    return await this.teacherService.updateTeacher(teacherId, updateTeacherDto);
  }

  @Delete('remove/:id')
  async getRemove(@Param('id', ParseIntPipe) teacherId: number): Promise<string> {
    return await this.teacherService.removeTeacher(teacherId);
  }
}
