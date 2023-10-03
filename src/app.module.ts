import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { CityModule } from './city/city.module';
import { SchoolClassModule } from './school-class/school-class.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolModule } from './school/school.module';
import { AttendanceModule } from './attendance/attendance.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      "type":"mysql",
      "host": "localhost",
      "port": 3306,
      "username":"root",
      "password":"adoptapp",
      "database": "school_database",
      "entities":[__dirname + "/**/**/**.entity{.ts,.js}"],
      "synchronize": true
    }),
    StudentModule, 
    TeacherModule, 
    CityModule, 
    SchoolClassModule, 
    SchoolModule, 
    AttendanceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
