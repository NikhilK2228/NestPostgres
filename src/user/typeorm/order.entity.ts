import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn({type: 'bigint',name: 'order_id',})
  id : number;
  
  @Column()
  totalprice : string;

  @Column(()=>User)
  userid : number;

  @Column(()=>Product)
  productid : number;

  @Column()
  quantity : number;

  // @ManyToOne(() => User, user => user.orders)
  // user: User;

  // @ManyToMany(()=>Product, product => product.orders)
  // @JoinTable()
  // products:Product[]
}