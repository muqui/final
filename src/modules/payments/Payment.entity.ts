

import {

  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,

} from 'typeorm';

import { v7 as uuid } from 'uuid';
import { Order } from '../orders/Order.entity';

@Entity ({

  name: 'payments',

})

export class Payment {

  @PrimaryGeneratedColumn ('uuid')
  id: string = uuid ();

  @Column ({

    type: 'decimal',
    nullable: false,

  })

  price: number;

  @Column ({

    type: 'timestamp',
    nullable: true,
    precision: 0,

  })

  invoicePaidAt: Date;

  @Column ({

    type: 'varchar',
    length: 20,
    nullable: false,
    default: 'pending',
    
  })

  status: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  externalOrderId: string;

  @OneToOne ( () => Order, (order) => order.payment)
  @JoinColumn ({ name: 'order_id' })
  order: Order;

}

