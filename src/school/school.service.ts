import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { School } from './entities/school.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateSchoolDto, UpdateSchoolDto } from './dto/school.dto';
import { City } from 'src/city/entities/city.entity';

@Injectable()
export class SchoolService {
    constructor(
        @InjectRepository(School)
        private readonly schoolRepository: Repository<School>,
        @InjectRepository(City)
        private readonly cityRepository: Repository<City>
    ) { }

    async createSchool(createSchoolDto: CreateSchoolDto): Promise<string> {
        const { name, address, cityId } = createSchoolDto;
        try {
            const city: City = await this.cityRepository.findOne({ where: { id: cityId } });
            if (!city) {
                throw new Error(`There is not city with id : ${cityId}.`);
            }
            const newSchool: School = new School(name, address);
            newSchool.city = city;
            if (!newSchool) {
                throw new Error(`Error adding school ${name}.`);
            }
            await this.schoolRepository.save(newSchool);
            return `${newSchool.getName()} school was added on city ${city.getName()}.`;

        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: error.message
            }, HttpStatus.BAD_REQUEST);
        }
    }

    async findById(schoolId: number): Promise<School> {
        try {
            const schoolCriteria: FindOneOptions = { where: { id: schoolId }, relations: ['city'] };
            const school: School = await this.schoolRepository.findOne(schoolCriteria);

            if (!school) {
                throw new Error(`There is no school with id : ${schoolId}.`);
            }
            return school;

        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: 'Error getting school. ' + error.message
            }, HttpStatus.BAD_REQUEST);
        }
    }

    async findAll(): Promise<School[]> {
        try {
            const schoolCriteria: FindManyOptions = { relations: ['city'] };
            const schools: School[] = await this.schoolRepository.find(schoolCriteria);

            if (!schools) {
                throw new Error(`Error getting schools.`);
            }
            return schools;

        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: error.message
            }, HttpStatus.BAD_REQUEST);
        }
    }

    async updateSchool(schoolId: number, updateSchoolDto: UpdateSchoolDto): Promise<string> {
        const { name, address, cityId } = updateSchoolDto;
        try {
            const school: School = await this.findById(schoolId);
            if (name) {
                school.setName(name);
            }
            if (address) {
                school.setAddress(address);
            }
            if (cityId) {
                const city: City = await this.cityRepository.findOne({ where: { id: cityId } });
                if (!city) {
                    throw new Error(`There is not city with id : ${cityId}.`);
                }
                school.city = city;
            }
            await this.schoolRepository.save(school);
            return `School with id ${schoolId} was edited.`;

        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: error.message
            }, HttpStatus.BAD_REQUEST);
        }
    }

    async removeSchool(schoolId: number): Promise<string> {
        try {
            const school: School = await this.findById(schoolId);
            await this.schoolRepository.remove(school);
            return `School with id ${schoolId} was remove.`;
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                message: error.message
            }, HttpStatus.CONFLICT);
        }
    }
}