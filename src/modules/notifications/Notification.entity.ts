import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v7 as uuid } from 'uuid';
import { Order } from '../orders/Order.entity';

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
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt: Date;

  @ManyToOne(() => Order, (order) => order.notifications)
  order: Order;
}
