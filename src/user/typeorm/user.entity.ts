import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn({type: 'bigint',name: 'user_id',})
  id: number;
  
  @Column()
  username: string;

  @Column()
  emailid: string;

  @Column()
  address: string;
  
  @Column()
  password: string;

  @Column({ nullable: true })
  profilepicture : string;

  // @OneToMany(() => Order, order => order.user)
  // orders:Order[]
}