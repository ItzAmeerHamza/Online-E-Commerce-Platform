import { CoreEntity } from '../../common/entities/core.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class User extends CoreEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phone: string;

  @Column()
  age: number;

  @Column()
  address: string;

  @Column('boolean', { default: 0 })
  isAdmin: boolean;
}