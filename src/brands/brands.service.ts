import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

import {v4 as uuid} from 'uuid'


@Injectable()
export class BrandsService {

 private brands: Brand[] 
 //= [
//
//{
//  id: uuid(),
//  name:'Toyota',
//  createdAt: new Date().getTime(),
//},
//]
      
  create(createBrandDto: CreateBrandDto) {

    const {name} = createBrandDto

    const newBrand: Brand = {
      createdAt: new Date().getTime(),
      id: uuid(),
      name: name
    } 

    this.brands.push(newBrand)

    return newBrand
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand =  this.brands.find(res=> res.id == id);

    if(!brand){
      throw new NotFoundException(`Brand with id "${id}" not found`)
    }

    return brand
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {

    const brandData = this.findOne(id)

    this.brands = this.brands.map(res => {

      if(res.id == id){

        const updatedBrand: Brand = {
          createdAt: res.createdAt,
          id: res.id,
          name: updateBrandDto.name,
          updatedAt: new Date().getTime()
        }

        return updatedBrand
      }

      return res
    })

    return this.brands;
  }

  remove(id: string) {
    this.brands = this.brands.filter(res => res.id != id)
    return 
  }

  populateDataWithSeed(brandsSeed: Brand[]) {
    this.brands = brandsSeed
  }
}
