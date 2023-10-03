import { Module } from '@nestjs/common';
import { SchoolClassService } from './school-class.service';
import { SchoolClassController } from './school-class.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolClass } from './entities/school-class.entity';
import { School } from 'src/school/entities/school.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { TeacherService } from 'src/teacher/teacher.service';
import { SchoolService } from 'src/school/school.service';
import { Student } from 'src/student/entities/student.entity';
import { TeacherAddress } from 'src/city/entities/teacher.address.entity';
import { City } from 'src/city/entities/city.entity';
import { CityService } from 'src/city/city.service';

@Module({
  imports : [
    TypeOrmModule.forFeature([SchoolClass, School, Teacher, Student, TeacherAddress, City])
  ],
  controllers: [SchoolClassController],
  providers: [SchoolClassService, TeacherService, SchoolService, CityService],
  exports : [SchoolClassService]
})
export class SchoolClassModule {}
