import { StudentClass } from 'src/student/entities/student.classes.entity';
import { Attendance } from './entities/attendance.entity';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from '@nestjs/common';

@Module ({
    imports : [
        TypeOrmModule.forFeature([Attendance, StudentClass])
    ],
    controllers : [],
    providers: []
})
export class AttendanceModule {}