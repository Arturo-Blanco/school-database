import { StudentClass } from 'src/student/entities/student.classes.entity';
import { Attendance } from './entities/attendance.entity';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from '@nestjs/common';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';

@Module ({
    imports : [
        TypeOrmModule.forFeature([Attendance, StudentClass])
    ],
    controllers : [AttendanceController],
    providers: [AttendanceService]
})
export class AttendanceModule {}