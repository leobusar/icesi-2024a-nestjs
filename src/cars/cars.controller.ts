import { Controller, Get, HttpCode, Post, Param, Body, Put, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './interface/car.interface';

@Controller('cars')
//@UsePipes(ValidationPipe)
export class CarsController {

    constructor (
        private readonly carService: CarsService
    ){
    }

    @Get()
    findAll(): any {
        return this.carService.findAll();
    }

    @Post()
    @HttpCode(201)
    create(@Body() car: CreateCarDto): Car {
        console.log(car);
        return this.carService.create(car);
    }

    @Put(":id")
    update(@Param("id", ParseUUIDPipe) id:string, @Body() car: UpdateCarDto): Car {

        return this.carService.update(id, car);
    }

    @Delete(":id")
    delete(@Param("id", ParseUUIDPipe) id:string): any {
        return this.carService.delete(id);
    }


    @Get("test")
    test(): string {
        return "other route in cars"
    }
    
    @Get(":id")
    findById(@Param("id", ParseUUIDPipe) id:string): any {
        return this.carService.findOneById(id);

    }    
}
