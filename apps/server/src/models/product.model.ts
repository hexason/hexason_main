import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductImages } from './product_images.model';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  title: string;

  @Column()
  description?: string;

  @Column({ nullable: true })
  brand?: string;

  @Column({ nullable: true })
  itemType?: string;

  @Column()
  image: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  oldPrice?: number;

  @Column({ type: 'int', default: 0 })
  sold: number;

  @Column({ type: 'int', default: 0 })
  quantity: number;

  @Column({ enum: ['active', 'inactive'] })
  status: string;

  @OneToMany(() => ProductImages, (productImages) => productImages.product)
  images: ProductImages[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
