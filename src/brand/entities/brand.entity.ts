import { User } from "src/auth/entities/user.entity";
import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

//     @ManyToOne(
//         () => User,
//         ( user ) => user.brand,
//         { eager: true }
//     )
//     user: User; 

    @BeforeInsert()
    checkSlug(): void {
        if (!this.slug) {
            this.slug = this.name;
        }

        this.slug = this.slug.toLowerCase().replace(/ /g, '-');
    }
}
