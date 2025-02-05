import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v7 as uuid } from 'uuid';
import { Order } from '../orders/order.entity';

@Entity({
  name: 'notifications',
})
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({
    type: 'text',
    nullable: false,
  })
  message: string;

  @Column({
    type: 'date',
    nullable: false,
  })
  createdAt: Date;

  @ManyToOne(() => Order, (order) => order.notifications)
  order: Order;
}
