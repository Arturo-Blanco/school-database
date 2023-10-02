import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { StudentAddress } from 'src/city/entities/student.address.entity';
import { CityModule } from 'src/city/city.module';

@Module({
  imports : [
    TypeOrmModule.forFeature([Student, StudentAddress]), 
    CityModule
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
