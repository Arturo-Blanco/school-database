import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { School } from "./entities/school.entity";
import { SchoolClass } from "src/school-class/entities/school-class.entity";
import { City } from "src/city/entities/city.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([School, SchoolClass, City])
    ],
    controllers: [],
    providers: []
})
export class SchoolModule { }