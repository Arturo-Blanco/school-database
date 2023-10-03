import { School } from 'src/school/entities/school.entity';
import { Body, Controller, Get, Post, ParseIntPipe, Param, Patch, Delete } from '@nestjs/common';
import { SchoolService } from './school.service';
import { CreateSchoolDto, UpdateSchoolDto } from './dto/school.dto';

@Controller('school')
export class SchoolController {
    constructor(private readonly schoolServie: SchoolService) { }

    @Post('add')
    async getCreateSchool(@Body() createSchoolDto: CreateSchoolDto): Promise<string> {
        return await this.schoolServie.createSchool(createSchoolDto);
    }

    @Get('search/:id')
    async getFindById(@Param('id', ParseIntPipe) schoolId: number): Promise<School> {
        return await this.schoolServie.findById(schoolId);
    }

    @Get('all')
    async getFindAll(): Promise<School[]> {
        return await this.schoolServie.findAll();
    }

    @Patch('update/:id')
    async getUpdateSchool(@Param('id', ParseIntPipe) schoolId: number, @Body() updateSchoolDto: UpdateSchoolDto): Promise<string> {
        return await this.schoolServie.updateSchool(schoolId, updateSchoolDto);
    }

    @Delete('remove/:id')
    async getRemoveSchool(@Param('id', ParseIntPipe) schoolId: number): Promise<string> {
        return await this.schoolServie.removeSchool(schoolId);
    }
}