import { StudentClass } from "src/student/entities/student.classes.entity";
import { CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

// @Entity({ name: 'attendances' })
// export class Attendance {
//     @PrimaryGeneratedColumn()
//     student_attendance_id : number;

//     @CreateDateColumn()
//     date: Date;

//     @ManyToOne(() => StudentClass, studentClass => studentClass.attendances)
//     studentClass: StudentClass;

//     constructor(studentClass : StudentClass) {
//         this.studentClass = studentClass;
//     }
//     public getClassId(): StudentClass {
//         return this.studentClass;
//     }

//     public setClassId(newClassId: StudentClass): void {
//         this.studentClass = newClassId;
//     }
// }
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

    constructor(studentClass: StudentClass) {
        this.studentClass = studentClass;
    }
    public getClassId(): StudentClass {
        return this.studentClass;
    }
    public setClassId(newClassId: StudentClass): void {
        this.studentClass = newClassId;
    }
    public getDate(): Date {
        return this.date;
    }
}