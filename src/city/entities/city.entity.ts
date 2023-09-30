import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TeacherAddress } from "./teacher.address.entity";
import { StudentAddress } from "./student.address.entity";
import { School } from "src/school/entities/school.entity";

@Entity({ name: "cities" })
export class City {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => School, school => school.city)
    schools: School[];

    @OneToMany(() => TeacherAddress, teacherAddress => teacherAddress.city)
    teacherAddress: TeacherAddress[];

    @OneToMany(() => StudentAddress, studentAddress => studentAddress.city)
    studentAddress: StudentAddress[];

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
