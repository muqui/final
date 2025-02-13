import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

import { User } from '../users/User.entity';
import { Payment } from '../payments/Payment.entity';
import { Notification } from '../notifications/Notification.entity';
import { Evidence } from '../evidences/Evidence.entity';
import { OrderHistory } from '../orderHistories/orderHistory.entity';
import { EquipmentType } from '../../enum/equipmentype.enum';
import { OrderStatus } from 'src/enum/orderstatus.enum';
import { v7 as uuid } from 'uuid';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ name: 'clientEmail' })
  clientEmail: string;

  @Column({ name: 'clientDni' })
  clientDni: number;

  @Column({
    type: 'enum',
    enum: EquipmentType,
    nullable: false,
    /*default: EquipmentType.CELULAR,*/
    update: true,
  })
  equipmentType: EquipmentType;

  @Column()
  imei: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'assignedTechnicianId' })
  assignedTechnician: User | null;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    nullable: false,
    /*default: OrderStatus.STARTED,*/
  })
  status: OrderStatus;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @ManyToOne(() => User, (user) => user.orders, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => OrderHistory, (orderHistory) => orderHistory.order)
  orderHistories: OrderHistory[];

  @OneToMany(() => Evidence, (evidence) => evidence.order)
  evidences: Evidence[];

  @OneToMany(() => Notification, (notification) => notification.order)
  notifications: Notification[];

  @OneToOne(() => Payment, (payment) => payment.order)
  payment: Payment;

  @Column({ type: 'jsonb', default: [] })
  statusHistory: { [key: string]: string }[];
}
