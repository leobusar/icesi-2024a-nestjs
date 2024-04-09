import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import {v4 as uuid, validate as isUUID} from  'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class BrandService {

  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Brand) 
    private readonly brandRepository: Repository<Brand>
  ){

  }

  async create(createBrandDto: CreateBrandDto) {

    const brand = this.brandRepository.create(createBrandDto);

    await this.brandRepository.save(brand);
    
    return brand;
   }

  findAll( paginationDto: PaginationDto ) {

    const { limit = 10, offset = 0 } = paginationDto;

    return this.brandRepository.find({
      take: limit,
      skip: offset,
      // TODO: relaciones
    })
  }

  async findOne( term: string ) {

    let brand: Brand;

    if ( isUUID(term) ) {
      brand = await this.brandRepository.findOneBy({ id: term });
    } else {
      const queryBuilder = this.brandRepository.createQueryBuilder(); 
      brand = await queryBuilder
        .where('UPPER(name) =:brand or slug =:slug', {
          brand: term.toUpperCase(),
          slug: term.toLowerCase(),
        }).getOne();
    }

    if ( !brand ) 
      throw new NotFoundException(`Brand with ${ term } not found`);

    return brand;
  }


  async update(id: string, updateBrandDto: UpdateBrandDto) {
    const brand = await this.brandRepository.preload({
      id: id,
      ...updateBrandDto
    });

    if ( !brand ) throw new NotFoundException(`Brand with id: ${ id } not found`);

    try {
      await this.brandRepository.save( brand );
      return brand;
      
    } catch (error) {
      this.handleDBExceptions(error);
    }
   
  }

  async remove(id: string) {
    const product = await this.findOne( id );
    await this.brandRepository.remove( product );
  }

  // fillBrandsWithSeedData(brands: Brand[]): void {
  //   this.brands = brands;
  // }

  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }

}
