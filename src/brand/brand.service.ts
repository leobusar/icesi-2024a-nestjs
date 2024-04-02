import { Injectable } from '@nestjs/common';
import {v4 as uuid} from  'uuid';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandService {

  private brands : Brand[] = [];

  create(createBrandDto: CreateBrandDto) {

    const {name} = createBrandDto;
    const brand: Brand =  {
      name,
      id: uuid(),
      createdAt:  new Date().getTime()
    }
    this.brands.push(brand);
    
    return brand;
   }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const   brand = this.brands.find(brand => brand.id === id);
    if(!brand){
      throw new Error(`Brand with id ${id} not found`);
    }
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    
    let brandDB = this.findOne(id);

    this.brands = this.brands.map(brand => {
      if(brand.id === id){
        brand = {...brand, ...updateBrandDto};
      }
      return brand;
    });
    
  }

  remove(id: string) {
    let brand = this.findOne(id);
    this.brands = this.brands.filter(brand => brand.id !== id); 
  }

  fillBrandsWithSeedData(brands: Brand[]): void {
    this.brands = brands;
  }
}
