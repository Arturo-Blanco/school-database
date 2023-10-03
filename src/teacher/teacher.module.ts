import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { Teacher } from './entities/teacher.entity';
import { TeacherAddress } from 'src/city/entities/teacher.address.entity';
import { SchoolClass } from 'src/school-class/entities/school-class.entity';
import { CityService } from 'src/city/city.service';
import { City } from 'src/city/entities/city.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Teacher, TeacherAddress, SchoolClass, City])
  ],
  controllers: [TeacherController],
  providers: [TeacherService, CityService],
  exports : [TeacherService]
})
export class TeacherModule {}
