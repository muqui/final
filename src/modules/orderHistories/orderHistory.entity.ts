

import {

  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,

} from 'typeorm';

import { v7 as uuid } from 'uuid';
import { Order } from '../orders/Order.entity';

@Entity ('orderhistories')

export class OrderHistory {

  @PrimaryGeneratedColumn('uuid')
  id: string = uuid ();


  @Column ({ type: 'varchar', length: 255 })
  event: string;

  @Column ({ type: 'timestamp', precision: 0, nullable: false })
  createdAt: Date;

  @ManyToOne ( () => Order, (order) => order.orderHistories, { eager: true })
  @JoinColumn ({ name: 'order_id' })
  order: Order;

}



