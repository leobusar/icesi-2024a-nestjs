import  {v4 as uuid} from 'uuid';
import { Brand } from 'src/brand/entities/brand.entity';

export const brandsSeed: Brand[] = [
    {
        id: uuid(),
        name: 'Toyota',
        createdAt: new Date().getTime()
    },
    {
        id: uuid(),
        name: 'Honda',
        createdAt: new Date().getTime()

    },
    {
        id: uuid(),
        name: 'Jeep',
        createdAt: new Date().getTime() 
    },
];