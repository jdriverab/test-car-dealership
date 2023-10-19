import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
//@UsePipes(ValidationPipe)

export class CarsController {
  constructor(private readonly carsService: CarsService) {}
  @Get('')
  getAllCars() {
    return this.carsService.findAll();
  }

  @Get(':id')
  getCarById(@Param('id', ParseUUIDPipe) id) {
    return this.carsService.findCarById(id);
  }

  @Post('')
  //@UsePipes(ValidationPipe)
  createCar(@Body() createCarDto: CreateCarDto) {
    return this.carsService.create(createCarDto)
  }

  @Patch(':id')
  updateCar(@Param('id', ParseUUIDPipe) id, @Body() updateCarDto:UpdateCarDto) {
      return this.carsService.update(id, updateCarDto)
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseUUIDPipe) id) {
      return this.carsService.delete(id)
  }
}
