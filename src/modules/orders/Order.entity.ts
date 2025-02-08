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

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.order, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'assignedTechnicianId' })
  assignedTechnician: User | null;

  @Column()
  clientEmail: string;

  @Column()
  description: string;

  @Column()
  clientDni: number;

  @Column({
    type: 'enum',
    enum: EquipmentType,
    nullable: false,
    default: EquipmentType.CELULAR,
    update: false,
  })
  equipmentType: EquipmentType;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    nullable: false,
    default: OrderStatus.STARTED,
  })
  status: OrderStatus;

  @OneToMany(() => OrderHistory, (orderHistory) => orderHistory.order)
  orderHistories: OrderHistory[];

  @OneToMany(() => Notification, (notification) => notification.order)
  notifications: Notification[];

  @OneToMany(() => Evidence, (evidence) => evidence.order)
  evidences: Evidence[];

  @OneToOne(() => Payment, (payment) => payment.order)
  payment: Payment;
}
