import { Role } from 'src/enum/Role.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v7 as uuid } from 'uuid';
import { Order } from '../orders/Order.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({
    nullable: false,
    length: 20,
  })
  name: string;

  @Column({
    length: 50,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    nullable: true,
  })
  password: string;

  @Column({
    nullable: false,
  })
  phone: string;

  @Column({
    nullable: true,
    type: 'int',
    default: 99999999,
    unique: true,
  })
  dni: number;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.CLIENT,
  })
  role: string;

  @Column({
    type: 'date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @OneToMany(() => Order, (orders) => orders.user)
  orders: Order[];
}
