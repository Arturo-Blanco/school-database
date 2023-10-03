import { TeacherAddress } from 'src/city/entities/teacher.address.entity';
import { SchoolClass } from 'src/school-class/entities/school-class.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity({ name: "teachers" })
export class Teacher {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @OneToMany(() => TeacherAddress, teacherAddress => teacherAddress.teacher)
    @JoinColumn()
    teacherAddress: TeacherAddress[];

    @OneToMany(() => SchoolClass, schoolClass => schoolClass.teacher)
    schoolClass: SchoolClass[];

    constructor(name: string, surname: string) {
        this.name = name;
        this.surname = surname;
    }
    public getId(): number {
        return this.id;
    }
    public getName(): string {
        return this.name;
    }
    public getSurname(): string {
        return this.surname;
    }
    public setName(newName: string): void {
        this.name = newName;
    }
    public setSurname(newSurname: string): void {
        this.surname = newSurname;
    }
}
