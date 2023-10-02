import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto, UpdateCityDto } from './dto/city.dto';
import { City } from './entities/city.entity';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) { }

  @Post('addCity')
  async getAddCity(@Body() createCityDto: CreateCityDto): Promise<City> {
    return await this.cityService.addCity(createCityDto);
  }

  @Get(':id')
  async getCityById(@Param('id', ParseIntPipe) cityId: number): Promise<City> {
    return await this.cityService.findById(cityId);
  }

  @Get('all')
  async getFindAll(): Promise<City[]> {
    return await this.cityService.findAll();
  }

  @Patch('update/:id')
  async getUpdateCity(@Param('id', ParseIntPipe) cityId: number, @Body() updateCityDto: UpdateCityDto): Promise<string> {
    return await this.cityService.updateCity(cityId, updateCityDto);
  }

  @Delete('remove/:id')
  async getRemoveCity(@Param('id', ParseIntPipe) cityId: number): Promise<string> {
    return await this.cityService.removeCity(cityId);
  }
}
