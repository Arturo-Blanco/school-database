import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { City } from './entities/city.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School } from 'src/school/entities/school.entity';
import { TeacherAddress } from './entities/teacher.address.entity';
import { StudentAddress } from './entities/student.address.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([City, School, TeacherAddress, StudentAddress])
  ],
  controllers: [CityController],
  providers: [CityService],
  exports : [CityService]
})
export class CityModule {}
