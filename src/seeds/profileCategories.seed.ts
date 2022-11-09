import {Factory, Seeder} from "typeorm-seeding";
import {Connection, getRepository} from "typeorm";
import { ProfileCategories } from "../entity/ProfileCategories";
import { ProductController } from "../controller/ProductController";


export class ProfileCategoriesSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {

        const repo = getRepository(ProfileCategories);
        const products = await ProductController.repo.find();

        let category1 = new ProfileCategories()
        category1.name = "Frame / Base"
        category1.displayMode = 1,
        category1.products = Promise.resolve(products);
        await repo.save(category1)

        let category2 = new ProfileCategories()
        category2.name = "Size"
        category2.displayMode = 1,
        category2.products = Promise.resolve(products);
        await repo.save(category2)

        let category3 = new ProfileCategories()
        category3.name = "Back Support",
        category3.displayMode = 1,
        category3.products = Promise.resolve(products);
        await repo.save(category3)

        let category4 = new ProfileCategories()
        category4.name = "Tilt"
        category4.displayMode = 1,
        category4.products = Promise.resolve(products);
        await repo.save(category4)

        let category5 = new ProfileCategories()
        category5.name = "Arms"
        category5.displayMode = 1,
        category5.products = Promise.resolve(products);
        await repo.save(category5)

        let category6 = new ProfileCategories()
        category6.name = "Armpad"
        category6.displayMode = 1,
        category6.products = Promise.resolve(products);
        await repo.save(category6)

        let category7 = new ProfileCategories()
        category7.name = "Caster"
        category7.displayMode = 1,
        category7.products = Promise.resolve(products);
        await repo.save(category7)
    }
}
