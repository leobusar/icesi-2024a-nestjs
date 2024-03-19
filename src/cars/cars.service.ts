import { Injectable, NotFoundException } from '@nestjs/common';
import {v4 as uuid} from  'uuid';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {


    private cars: Car[] = [
        {
            id: uuid(),
            brand: 'Toyota',
            model: 'Corolla' 
        },
        {
            id: uuid(),
            brand: 'Honda',
            model: 'Civic' 
        },
        {
            id: uuid(),
            brand: 'Jeep',
            model: 'Cherokee' 
        },
    ];

    findAll(): Car[] {
        return this.cars;
    }

    findOneById (id: string): Car {
        const car: Car  =  this.cars.find(car => car.id === id)
        if (!car) 
            throw new  NotFoundException(`Car with id ${id} not found`);
        return car;
    }

    create(createCar: CreateCarDto): Car{
        const car: Car = {
            id: uuid(),
            ...createCar
        }

        this.cars.push(car)

        return car;
    }

    update(id: string, carUpdate: UpdateCarDto): any {
        let car: Car  =  this.findOneById(id);
        
        if (carUpdate.id && carUpdate.id !== id)
            throw new NotFoundException(`Car with id ${id} not valid`);

        car = {
            ...car,
            ...carUpdate
        }
        this.cars = this.cars.map(c => c.id === id ? car : c);

        return car;
    }

    delete(id: string): any {
        const car: Car = this.findOneById(id);
        this.cars = this.cars.filter(c => c.id !== car.id);
        return car;
    }
}
