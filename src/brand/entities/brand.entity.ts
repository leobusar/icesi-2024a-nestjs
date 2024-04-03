import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Brand {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column('text', 
            {unique: true})
    name: string;

    @Column('text', 
            {nullable: true})
    description: string;

    @Column('text', 
            {unique: true})
    slug: string;

    @Column('timestamp', 
            {nullable: false, default: () => 'CURRENT_TIMESTAMP'})
    createdAt: number;

}
