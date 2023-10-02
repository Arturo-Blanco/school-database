import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCityDto, UpdateCityDto } from './dto/city.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { City } from './entities/city.entity';

@Injectable()
export class CityService {

  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>
  ) { }

  async addCity(createCityDto: CreateCityDto): Promise<City> {
    const { name } = createCityDto;
    try {
      const newCity: City = new City(name);
      if (!newCity) {
        throw new Error(`Error when creating the city ${name}.`);
      }
      return await this.cityRepository.save(newCity);

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message
      }, HttpStatus.BAD_REQUEST);
    }
  }

  async findById(cityId: number): Promise<City> {
    try {
      const cityCriteria: FindOneOptions = { where: { id: cityId } };
      const city: City = await this.cityRepository.findOne(cityCriteria);
      if (!city) {
        throw new Error(`There is not city with id :${cityId}.`);
      }
      return city;

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message
      }, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<City[]> {
    try {
      const cities: City[] = await this.cityRepository.find();
      if (!cities) {
        throw new Error('Error getting cities.');
      }
      return cities;

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message
      }, HttpStatus.BAD_REQUEST);
    }
  }

  async updateCity(cityId: number, updateCityDto: UpdateCityDto): Promise<string> {
    const { name } = updateCityDto;
    try {
      const city: City = await this.findById(cityId);
      if (name) {
        city.setName(name);
      }
      await this.cityRepository.save(city);
      return `City with id ${cityId} was edited.`;

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message
      }, HttpStatus.BAD_REQUEST);
    }
  }

  async removeCity(cityId: number): Promise<string> {
    try {
      const city: City = await this.findById(cityId);
      await this.cityRepository.remove(city);
      return `City with id ${cityId} was removed.`;

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message
      }, HttpStatus.BAD_REQUEST);
    }
  }
}
