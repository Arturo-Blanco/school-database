import { Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Student } from "./student.entity";
import { SchoolClass } from "src/school-class/entities/school-class.entity";
import { Asistance } from "src/asistance/entities/asistance.entity";

@Entity({ name: 'students_classes' })
export class StudentClass {

    @PrimaryColumn()
    student_id: number;

    @PrimaryColumn()
    class_id: number;

    @ManyToOne(() => Student, student => student.studentClass)
    @JoinColumn({ name: 'student_id' })
    student: Student;

    @ManyToOne(() => SchoolClass, schoolClass => schoolClass.studentClass)
    @JoinColumn({ name: 'class_id' })
    schoolClass: SchoolClass;

    @OneToMany(() => Asistance, asistance => asistance.studentClass)
    @JoinColumn()
    asistances: Asistance[];

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