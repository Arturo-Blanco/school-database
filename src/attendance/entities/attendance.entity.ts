import { StudentClass } from "src/student/entities/student.classes.entity";
import { CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({ name: 'attendances' })
export class Attendance {
    @PrimaryColumn({ name: 'studentClassStudentId' })
    student_id: number;

    @PrimaryColumn({ name: 'studentClassClassId' })
    class_id: number

    @CreateDateColumn()
    date: Date;

    @ManyToOne(() => StudentClass, studentClass => studentClass.attendances)
    studentClass: StudentClass;

    constructor(student_id: number, class_id: number) {
        this.student_id = student_id;
        this.class_id = class_id;
    }
    public getClassId(): number {
        return this.class_id;
    }
    public getStudentId(): number {
        return this.student_id;
    }
    public setClassId(newClassId: number): void {
        this.class_id = newClassId;
    }
    public setStudentId(newStudentId: number): void {
        this.student_id = newStudentId;
    }
}