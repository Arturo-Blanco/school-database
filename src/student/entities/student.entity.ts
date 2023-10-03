import { StudentAddress } from "src/city/entities/student.address.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StudentClass } from "./student.classes.entity";

@Entity({ name: 'students' })
export class Student {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    birth_date: Date;

    @OneToMany(() => StudentAddress, studentAddress => studentAddress.student, { cascade: true, onDelete: 'CASCADE' })
    studentAddress: StudentAddress[];

    @OneToMany(() => StudentClass, studentClass => studentClass.student, { cascade: true, onDelete: 'CASCADE' })
    studentClass: StudentClass[];

    constructor(name: string, surname: string, birth_date: Date) {
        this.name = name;
        this.surname = surname;
        this.birth_date = birth_date;
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
    public getBirthDate(): Date {
        return this.birth_date;
    }
    public setName(newName: string): void {
        this.name = newName;
    }
    public setSurname(newSurname: string): void {
        this.surname = newSurname;
    }
    public setBirthDate(newBirthDate: Date): void {
        this.birth_date = newBirthDate;
    }
}
