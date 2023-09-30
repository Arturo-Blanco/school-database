import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { Teacher } from './entities/teacher.entity';
import { TeacherAddress } from 'src/city/entities/teacher.address.entity';
import { SchoolClass } from 'src/school-class/entities/school-class.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Teacher, TeacherAddress, SchoolClass])
  ],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
