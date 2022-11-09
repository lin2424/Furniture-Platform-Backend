import {Factory, Seeder} from "typeorm-seeding";
import {Connection, getRepository} from "typeorm";
import {PaymentStatus, paymentStatusType} from "../entity/PaymentStatus";


export class PaymentStatusSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {

        const repo = getRepository(PaymentStatus)
        let paymentStatus1 = new PaymentStatus()
        paymentStatus1.status = paymentStatusType.PENDING
        await repo.save(paymentStatus1)

        let paymentStatus2 = new PaymentStatus()
        paymentStatus2.status = paymentStatusType.COMPLETE
        await repo.save(paymentStatus2)

        let paymentStatus3 = new PaymentStatus()
        paymentStatus3.status = paymentStatusType.REFUNDED
        await repo.save(paymentStatus3)

        let paymentStatus4 = new PaymentStatus()
        paymentStatus4.status = paymentStatusType.ABANDONED
        await repo.save(paymentStatus4)

        let paymentStatus5 = new PaymentStatus()
        paymentStatus5.status = paymentStatusType.CANCELLED
        await repo.save(paymentStatus5)

    }
}
