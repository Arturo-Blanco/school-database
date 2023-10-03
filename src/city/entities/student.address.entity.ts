import { Student } from './../../student/entities/student.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { City } from './city.entity';

@Entity({ name: 'students_address' })
export class StudentAddress {

    @PrimaryGeneratedColumn()
    student_address_id: number;

    @Column()
    address: string;

    @Column({ name: 'studentId' })
    student_id: number;

    @Column({ name: 'cityId' })
    city_id: number;

    @ManyToOne(() => Student, student => student.studentAddress)
    @JoinColumn()
    student: Student;

    @ManyToOne(() => City, city => city.studentAddress)
    @JoinColumn()
    city: City;

    constructor(address: string, student_id: number, city_id: number) {
        this.address = address;
        this.student_id = student_id;
        this.city_id = city_id;
    }
    public getAddressId(): number {
        return this.student_address_id;
    }
    public getAddress(): string {
        return this.address;
    }
    public getStudentId(): number {
        return this.student_id;
    }
    public getCityId(): number {
        return this.city_id;
    }
    public setAddress(newAddress: string): void {
        this.address = newAddress;
    }
    public setStudentId(newStudentId: number): void {
        this.student_id = newStudentId;
    }
    public setCityId(newCityId: number): void {
        this.city_id = newCityId;
    }
}