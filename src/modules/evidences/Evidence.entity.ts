import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v7 as uuid } from 'uuid';
import { Order } from '../orders/order.entity';

@Entity({
  name: 'entities',
})
export class Evidence {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({
    nullable: false,
  })
  fileUrl: string;

  @Column({
    type: 'date',
    nullable: false,
  })
  createdAt: Date;

  @ManyToOne(() => Order, (order) => order.evidences)
  order: Order;
}
