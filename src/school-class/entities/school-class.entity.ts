import { School } from "src/school/entities/school.entity";
import { StudentClass } from "src/student/entities/student.classes.entity";
import { Teacher } from "src/teacher/entities/teacher.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'schools_classes' })
export class SchoolClass {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    school_id: number;

    @Column()
    teacher_id: number;

    @ManyToOne(() => School, school => school.schoolClass)
    @JoinColumn({ name: 'school_id' })
    school: School;

    @ManyToOne(() => Teacher, teacher => teacher.schoolClass)
    @JoinColumn({ name: 'teacher_id' })
    teacher: Teacher;

    @OneToMany(() => StudentClass, studentClass => studentClass.student)
    studentClass: StudentClass[];

    constructor(name: string) {
        this.name = name;
    }
    public getId(): number {
        return this.id;
    }
    public getName(): string {
        return this.name;
    }
    public setName(newName: string): void {
        this.name = newName;
    }
}
