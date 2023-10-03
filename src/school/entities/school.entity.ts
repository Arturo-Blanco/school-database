import { City } from "src/city/entities/city.entity";
import { SchoolClass } from "src/school-class/entities/school-class.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'schools' })
export class School {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @ManyToOne(() => City, city => city.schools)
    @JoinColumn({ name: 'city_id' })
    city: City;

    @OneToMany(() => SchoolClass, schoolClass => schoolClass.school)
    schoolClass: SchoolClass[];

    constructor(name: string, address: string) {
        this.name = name;
        this.address = address;
    }
    public getId(): number {
        return this.id;
    }
    public getName(): string {
        return this.name;
    }
    public getAddress(): string {
        return this.address;
    }
    public getCityId(): number {
        return this.city.getId();
    }
    public setName(newName: string): void {
        this.name = newName;
    }
    public setAddress(newAddress: string): void {
        this.address = newAddress;
    }
}
