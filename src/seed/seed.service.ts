import { Injectable } from '@nestjs/common';
import { CarsService } from '../cars/cars.service';
import { carsSeed } from './data/cars.seed';
import { BrandService } from 'src/brand/brand.service';
import { brandsSeed } from './data/brand.seed';

@Injectable()
export class SeedService {
  constructor(
    private readonly carsService: CarsService,
    private readonly brandService: BrandService,
  ) {}
  populateDB() {
//    this.carsService.fillCarsWithSeedData(carsSeed);
//    this.brandService.fillBrandsWithSeedData(brandsSeed)
    
    return 'DB populated';
  }
}
