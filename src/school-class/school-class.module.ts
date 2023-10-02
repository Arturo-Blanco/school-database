import { Module } from '@nestjs/common';
import { SchoolClassService } from './school-class.service';
import { SchoolClassController } from './school-class.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolClass } from './entities/school-class.entity';
import { School } from 'src/school/entities/school.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { TeacherService } from 'src/teacher/teacher.service';
import { SchoolService } from 'src/school/school.service';

@Module({
  imports : [
    TypeOrmModule.forFeature([SchoolClass, School, Teacher])
  ],
  controllers: [SchoolClassController],
  providers: [SchoolClassService, TeacherService, SchoolService],
})
export class SchoolClassModule {}
