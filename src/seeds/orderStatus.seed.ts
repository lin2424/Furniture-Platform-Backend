import {Factory, Seeder} from "typeorm-seeding";
import {Connection, getRepository} from "typeorm";
import {OrderStatus, orderStatusType} from "../entity/OrderStatus";


export class OrderStatusSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {

        const repo = getRepository(OrderStatus)
        let OrderStatus1 = new OrderStatus()
        OrderStatus1.status = orderStatusType.INPROGRESS
        await repo.save(OrderStatus1)

        let OrderStatus2 = new OrderStatus()
        OrderStatus2.status = orderStatusType.PAYMENTRECEIVED
        await repo.save(OrderStatus2)

        let OrderStatus3 = new OrderStatus()
        OrderStatus3.status = orderStatusType.PAYMENTFAILED
        await repo.save(OrderStatus3)

        let OrderStatus4 = new OrderStatus()
        OrderStatus4.status = orderStatusType.COMPLETED
        await repo.save(OrderStatus4)

        let OrderStatus5 = new OrderStatus()
        OrderStatus5.status = orderStatusType.CLOSED
        await repo.save(OrderStatus5)

        let OrderStatus6 = new OrderStatus()
        OrderStatus6.status = orderStatusType.CANCELLED
        await repo.save(OrderStatus6)

    }
}
