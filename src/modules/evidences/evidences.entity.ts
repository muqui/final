
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v7 as uuid } from 'uuid';
import { Order } from "../orders/Order.entity";


@Entity({
    name: 'evidences'
})
export class Evidence{
    @PrimaryGeneratedColumn('uuid')
  id: string = uuid();



    @Column()
    fileUrl:string;
   
    @Column({type: "timestamp with time zone", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column()
    orderId: string;
    
   
    @ManyToOne(() => Order, order => order.evidences)
    @JoinColumn() // Asegura la clave foránea
    order: Order;



}