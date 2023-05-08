import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint',name: 'prod_id',})
  id: number;
  
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: string;

  // @ManyToMany(() => Order, order => order.products)
  // orders: Order[];
}