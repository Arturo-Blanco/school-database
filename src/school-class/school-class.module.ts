import { Module } from '@nestjs/common';
import { SchoolClassService } from './school-class.service';
import { SchoolClassController } from './school-class.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolClass } from './entities/school-class.entity';
import { School } from 'src/school/entities/school.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';

@Module({
  imports : [
    TypeOrmModule.forFeature([SchoolClass, School, Teacher])
  ],
  controllers: [SchoolClassController],
  providers: [SchoolClassService],
})
export class SchoolClassModule {}
