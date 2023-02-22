import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.model";

@Entity()
export class ProductImages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;
 
  @Column({nullable: true})
  blurhash: string;

  @ManyToOne(() => Product, (product) => product.images)
  product: Product
}
