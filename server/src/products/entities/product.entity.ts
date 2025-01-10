import { CoreEntity } from 'src/common/entities/core.entity';
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductCategory } from './product-category.entity';

@Entity()
export class Product extends CoreEntity {  
  @PrimaryGeneratedColumn('uuid')
  productId: String;

  @Column()
  name: String;

  @Column()
  description: String;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  price: number;

  @Column()
  quantity: number;

  @ManyToOne(() => ProductCategory, (category) => category.products)
  category: ProductCategory;

}