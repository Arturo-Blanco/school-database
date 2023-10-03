import { Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Student } from "./student.entity";
import { SchoolClass } from "src/school-class/entities/school-class.entity";
import { Attendance } from "src/attendance/entities/attendance.entity";

@Entity({ name: 'students_classes' })
export class StudentClass {

    @PrimaryColumn({ name: 'studentId' })
    student_id: number;

    @PrimaryColumn({ name: 'schoolClassId' })
    class_id: number;

    @ManyToOne(() => Student, student => student.studentClass)
    @JoinColumn()
    student: Student;

    @ManyToOne(() => SchoolClass, schoolClass => schoolClass.studentClass)
    @JoinColumn()
    schoolClass: SchoolClass;

    @OneToMany(() => Attendance, attendance => attendance.studentClass)
    @JoinColumn()
    attendances: Attendance[];

    constructor(student_id: number, class_id: number) {
        this.student_id = student_id;
        this.class_id = class_id;
    }
    public getStudentId(): number {
        return this.student_id;
    }
    public getClassId(): number {
        return this.class_id;
    }
    public setStudentId(newStudentId: number): void {
        this.student_id = newStudentId;
    }
    public setClassId(newClassId: number): void {
        this.class_id = newClassId;
    }
}