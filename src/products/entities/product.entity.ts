import { CoreEntity } from 'src/common/entities/core.entity';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Product extends CoreEntity {
  @Column()
  name: String;

  @Column()
  description: String;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  price: number;

  @Column()
  quantity: number;

}