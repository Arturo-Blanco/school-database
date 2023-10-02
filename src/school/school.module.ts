import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { School } from "./entities/school.entity";
import { SchoolClass } from "src/school-class/entities/school-class.entity";
import { City } from "src/city/entities/city.entity";
import { SchoolController } from "./school.controller";
import { SchoolService } from "./school.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([School, SchoolClass, City])
    ],
    controllers: [SchoolController],
    providers: [SchoolService]
})
export class SchoolModule { }