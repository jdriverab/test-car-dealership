import { Injectable, NotFoundException, ParseUUIDPipe } from '@nestjs/common';
import {v4 as uuid} from 'uuid'
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {
  private cars: ICarInterface[] 
  //= [
  //    { id: uuid(), model: 'Civic', brand: 'Honda' },
  //    { id: uuid(), model: 'Corolla', brand: 'Toyota' },
  //    { id: uuid(), model: 'A3', brand: 'Audi' },
  //  ];

  public findAll(){
      return this.cars
  }

  public findCarById (id: string){
    const car =  this.cars.find(res=>res.id == id)

    if (!car){
        throw new NotFoundException(`Car with id ${id} not found.`)
    }

    return car
  }

  public create (createCarDto: CreateCarDto) {

    const newCar:ICarInterface = {...createCarDto, id: uuid()}

    this.cars.push(newCar)

    return newCar
  }

  public update (id: string, updateCarDto:UpdateCarDto){
    const carUpdate =  this.findCarById(id)
    
    const carUpdateIndex =  this.cars.findIndex(res=>res.id == id)

    const updatedBrand = updateCarDto.brand ? updateCarDto.brand :carUpdate.brand
    const updatedId = updateCarDto.id ? updateCarDto.id : carUpdate.id
    const updatedModel = updateCarDto.model ? updateCarDto.model : carUpdate.model

    const newCarInfo:ICarInterface  = {brand: updatedBrand, id:updatedId, model:updatedModel}

    this.cars.splice(carUpdateIndex,1, newCarInfo)

    return newCarInfo

  }

  public delete (id: string){
    const carToDelete =  this.findCarById(id)

    this.cars = this.cars.filter(res=> res.id != id)
    return
  }


  populateDataWithSeed(carsSeed: ICarInterface[]) {
    this.cars = carsSeed
  }
}
