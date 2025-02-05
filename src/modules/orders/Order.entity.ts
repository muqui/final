

import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/User.entity";
//import { OrderHistory } from "../orderHistories/orderHistory.entity";
import { Evidence } from "../evidences/evidences.entity";
import { OrderHistory } from "../orderHistories/orderHistory.entity";

@Entity ('orders')

export class Order {

  @PrimaryGeneratedColumn ('uuid')
  id: string;

  @Column ({ name: 'userId' })  
  userId: string; 
  
  @Column ()
  clientEmail: string;

  @Column ()
  description: string;

  @Column ()
  status: string;

  @Column ()
  clientDni: number;  

 // @ManyToOne (() => User, user => user.order, { eager: true })
 // user: User;

  @OneToMany (() => OrderHistory, orderHistory => orderHistory.order)
  orderHistories: OrderHistory [];

 // @OneToMany (() => Notification, notification => notification.order)
 // notifications: Notification [];

  @OneToMany (() => Evidence, evidence => evidence.order)
  evidences: Evidence [];

//  @OneToMany (() => Payment, payment => payment.order)
//  payments: Payment [];

}
