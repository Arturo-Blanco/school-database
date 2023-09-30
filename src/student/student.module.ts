import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { StudentAddress } from 'src/city/entities/student.address.entity';

@Module({
  imports : [
    TypeOrmModule.forFeature([Student, StudentAddress])
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
