import { Body, Controller, Get, Patch, Post, ParseIntPipe, Param, Delete } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceDto } from './dto/attendance.dto';
import { Attendance } from './entities/attendance.entity';

@Controller('attendance')
export class AttendanceController {
    constructor(private readonly attendanceService: AttendanceService) { }

    @Post('add')
    async getAddAttendance(@Body() attendanceDto: AttendanceDto): Promise<string> {
        return await this.attendanceService.addAttendance(attendanceDto);
    }

    @Get('all')
    async getFindAll(): Promise<Attendance[]> {
        return await this.attendanceService.findAll();
    }

    @Patch('update/:studentId/:classId')
    async getUpdateAttendance(@Param('studentId', ParseIntPipe) student_id: number, @Param('classId', ParseIntPipe) class_id: number, @Body() updateAttendance: AttendanceDto): Promise<string> {
        return await this.attendanceService.updateAttendance(student_id, class_id, updateAttendance);
    }

    @Delete('remove/:studentId/:classId')
    async getRemoveAttendance(@Param('studentId', ParseIntPipe) studentId: number, @Param('classId', ParseIntPipe) classId: number): Promise<string> {
        return await this.attendanceService.removeAttendance(studentId, classId);
    }
} 
