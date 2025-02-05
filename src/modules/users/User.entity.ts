import { Role } from 'src/enum/Role.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v7 as uuid } from 'uuid';
import { Order } from '../orders/order.entity';

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
  })
  email: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
  })
  role: string;

  @Column({
    type: 'date',
  })
  createdAt: Date;

  @OneToMany(() => Order, (orders) => orders.user)
  order: Order[];
}
