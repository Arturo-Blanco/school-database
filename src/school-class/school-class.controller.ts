import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { SchoolClassService } from './school-class.service';
import { CreateSchoolClassDto, UpdateSchoolClassDto } from './dto/school-class.dto';
import { SchoolClass } from './entities/school-class.entity';

@Controller('schoolClass')
export class SchoolClassController {
  constructor(private readonly schoolClassService: SchoolClassService) { }

  @Post('add')
  async getCreateSchoolClass(@Body() createSchoolClassDto: CreateSchoolClassDto): Promise<string> {
    return await this.schoolClassService.createSchoolClass(createSchoolClassDto);
  }

  @Get('search/:id')
  async getClassById(@Param('id', ParseIntPipe) schoolClassId: number): Promise<SchoolClass> {
    return await this.schoolClassService.findById(schoolClassId);
  }

  @Get('relation/:id')
  async getClassRelations(@Param('id', ParseIntPipe) schoolClassId: number): Promise<SchoolClass> {
    return await this.schoolClassService.findWitRelations(schoolClassId);
  }

  @Get('all')
  async findAll(): Promise<SchoolClass[]> {
    return await this.schoolClassService.findAll();
  }

  @Patch('update/:id')
  async getUpdate(@Param('id', ParseIntPipe) schoolClassId: number, @Body() updateSchoolClassDto: UpdateSchoolClassDto): Promise<string> {
    return await this.schoolClassService.updateSchoolClass(schoolClassId, updateSchoolClassDto);
  }

  @Delete('remove/:id')
  async getRemove(@Param('id', ParseIntPipe) schoolClassId: number): Promise<string> {
    return await this.schoolClassService.removeSchoolClass(schoolClassId);
  }
}
