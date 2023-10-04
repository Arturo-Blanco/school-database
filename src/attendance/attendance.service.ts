import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { AttendanceDto } from './dto/attendance.dto';
import { StudentClass } from 'src/student/entities/student.classes.entity';

@Injectable()
export class AttendanceService {
    constructor(
        @InjectRepository(Attendance)
        private readonly attendanceRepository: Repository<Attendance>,
        @InjectRepository(StudentClass)
        private readonly studentClassRepository: Repository<StudentClass>
    ) { }

    async createAttendance(attendanceDto: AttendanceDto): Promise<string> {
        const { studentId, classId } = attendanceDto;
        try {
            const studentClassCriteria: FindOneOptions = { where: { student_id: studentId, class_id: classId } };
            const studentClass: StudentClass = await this.studentClassRepository.findOne(studentClassCriteria);
            if (!studentClass) {
                throw new Error(`The student is not assigned the class.`);
            }
            const hasAttendance: Attendance = await this.attendanceRepository.findOne({ where: { student_id: studentId, class_id: classId } });
            if (hasAttendance) {
                return `Student with id ${studentId} is already present in class ${classId}.`;
            }
            
            const newAttendance: Attendance = new Attendance(studentClass);
            if (!newAttendance) {
                throw new Error(`Error adding new attendance.`);
            }

            await this.attendanceRepository.save(newAttendance);
            return `Student with id ${studentId} had present on class ${classId}.`;

        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }

    async findAll(): Promise<Attendance[]> {
        try {
            const attendances: Attendance[] = await this.attendanceRepository.find();
            if (!attendances) {
                throw new Error('Error getting attendances.');
            }
            return attendances;

        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }

    async updateAttendance(student_id: number, class_id: number, updateAttendance: AttendanceDto): Promise<string> {
        const { studentId, classId } = updateAttendance;
        try {
            const attendanceCriteria: FindOneOptions = { where: { student_id: student_id, class_id: class_id } }
            const attendance: Attendance = await this.attendanceRepository.findOne(attendanceCriteria);
            if (!attendance) {
                throw new Error(`Student with id ${student_id} do not have attendance in class ${class_id}.`);
            }
            await this.removeAttendance(student_id,class_id);
            await this.createAttendance(updateAttendance);
            
            return `Attendance was edited.`;

        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }

    async removeAttendance(studentId: number, classId: number): Promise<string> {
        try {
            const attendanceCriteria: FindOneOptions = { where: { student_id: studentId, class_id: classId } }
            const attendance: Attendance = await this.attendanceRepository.findOne(attendanceCriteria);
            if (!attendance) {
                throw new Error(`Student with id ${studentId} do not have attendance in class ${classId}.`);
            }
            await this.attendanceRepository.remove(attendance);
            return `Attendance of student with id ${studentId} was removed from the class ${classId}.`;

        } catch (error) {
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                error: 'Error removing attendance. ' + error.message,
            }, HttpStatus.CONFLICT);
        }
    }
}