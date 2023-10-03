import { Teacher } from 'src/teacher/entities/teacher.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { City } from './city.entity';

@Entity({ name: 'teachers_address' })
export class TeacherAddress {

    @PrimaryGeneratedColumn()
    teacher_address_id: number;

    @Column()
    address: string;

    @Column({ name: 'teacherId' })
    teacher_id: number;

    @Column({ name: 'cityId' })
    city_id: number;

    @ManyToOne(() => Teacher, teacher => teacher.teacherAddress)
    @JoinColumn()
    teacher: Teacher;

    @ManyToOne(() => City, city => city.teacherAddress)
    @JoinColumn()
    city: City;

    constructor(address: string, teacher_id: number, city_id: number) {
        this.address = address;
        this.teacher_id = teacher_id;
        this.city_id = city_id;
    }
    public getAddressId(): number {
        return this.teacher_address_id;
    }
    public getAddress(): string {
        return this.address;
    }
    public getTeacherId(): number {
        return this.teacher_id;
    }
    public getCityId(): number {
        return this.city_id;
    }
    public setAddress(newAddress: string): void {
        this.address = newAddress;
    }
    public setTeacherId(newTeacherId: number): void {
        this.teacher_id = newTeacherId;
    }
    public setCityId(newCityId: number): void {
        this.city_id = newCityId;
    }
}