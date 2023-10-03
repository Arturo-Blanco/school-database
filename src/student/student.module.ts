import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { StudentAddress } from 'src/city/entities/student.address.entity';
import { StudentClass } from './entities/student.classes.entity';
import { CityService } from 'src/city/city.service';
import { SchoolClass } from 'src/school-class/entities/school-class.entity';
import { City } from 'src/city/entities/city.entity';
import { School } from 'src/school/entities/school.entity';
import { SchoolService } from 'src/school/school.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, StudentAddress, StudentClass, SchoolClass, City, School])
  ], 
  controllers: [StudentController],
  providers: [StudentService, CityService, SchoolService],
})
export class StudentModule { }
