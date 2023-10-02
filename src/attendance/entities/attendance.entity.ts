import { StudentClass } from "src/student/entities/student.classes.entity";
import { CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({ name: 'attendances' })
export class Attendance {

    @PrimaryColumn()
    studentClassClassId: number;

    @PrimaryColumn()
    studentClassStudentId: number;

    @CreateDateColumn()
    date: Date;

    @ManyToOne(() => StudentClass, studentClass => studentClass.attendances)
    studentClass: StudentClass;

    constructor(class_id: number, student_id: number) {
        this.studentClassClassId = class_id;
        this.studentClassStudentId = student_id;
    }
    public getClassId(): number {
        return this.studentClassClassId;
    }
    public getStudentId(): number {
        return this.studentClassStudentId;
    }
    public setClassId(newClassId: number): void {
        this.studentClassClassId = newClassId;
    }
    public setStudentId(newStudentId: number): void {
        this.studentClassStudentId= newStudentId;
    }
}