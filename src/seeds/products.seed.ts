import {Factory, Seeder} from "typeorm-seeding";
import {Connection, getRepository} from "typeorm";
import { ProfileCategoriesController } from "../controller/ProfileCategoriesController";
import { Product } from "../entity/Product";


export class ProductsSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {

        const repo = getRepository(Product);
        const profileCategories = await ProfileCategoriesController.repo.find();

        let product1 = new Product();
        product1.slug = "aeron_chair";
        product1.name = "Aeron Chair";
        product1.price = 1745;
        product1.description = "The Aeron_Chair combines a deep knowledge of human-centered design with cutting-edge technology. With over 7 million sold, our most admired and recognized work chair still sets the benchmark for ergonomic comfort more than 20 years after its debut.";
        product1.media = "http://api-ecommerce.mark2win.com/Aeron_Chair/ig_prd_ovw_aeron_chairs_01.jpg|http://api-ecommerce.mark2win.com/Aeron_Chair/ig_prd_ovw_aeron_chairs_02.jpg|http://api-ecommerce.mark2win.com/Aeron_Chair/ig_prd_ovw_aeron_chairs_03.jpg|http://api-ecommerce.mark2win.com/Aeron_Chair/ig_prd_ovw_aeron_chairs_04.jpg|http://api-ecommerce.mark2win.com/Aeron_Chair/ig_prd_ovw_aeron_chairs_05.jpg|http://api-ecommerce.mark2win.com/Aeron_Chair/ig_prd_ovw_aeron_chairs_06.jpg|http://api-ecommerce.mark2win.com/Aeron_Chair/ig_prd_ovw_aeron_chairs_07.jpg";
        product1.colorPalette = "#ffffff|#b0453f|#5f6062|#a1adad|#364757";
        product1.isActive = true;
        product1.isDelete = false;
        await repo.save(product1)
        let product2 = new Product();
        product2.slug = "low-back_cosm_chair";
        product2.name = "Low-Back Cosm Chair";
        product2.price = 1120;
        product2.description = "A balance of sculptural form and effortless function, the Low-Back Cosm gives you instant comfort—anywhere you work. It was designed to be as ergonomically innovative as it is beautiful and automatically adjust to anyone who sits down.\n";
        product2.media = "http://api-ecommerce.mark2win.com/Low_Back_Cosm_Chair/ig_prd_ovw_cosm_chairs_01_na.jpg|http://api-ecommerce.mark2win.com/Low_Back_Cosm_Chair/ig_prd_ovw_cosm_chairs_02_na.jpg|http://api-ecommerce.mark2win.com/Low_Back_Cosm_Chair/ig_prd_ovw_cosm_chairs_03_na.jpg|http://api-ecommerce.mark2win.com/Low_Back_Cosm_Chair/ig_prd_ovw_cosm_chairs_04_na.jpg|http://api-ecommerce.mark2win.com/Low_Back_Cosm_Chair/ig_prd_ovw_cosm_chairs_05_na.jpg|http://api-ecommerce.mark2win.com/Low_Back_Cosm_Chair/ig_prd_ovw_cosm_chairs_06_na.jpg|http://api-ecommerce.mark2win.com/Low_Back_Cosm_Chair/ig_prd_ovw_cosm_chairs_07_na.jpg";
        product2.colorPalette = "#ffffff|#b0453f|#5f6062|#a1adad|#364757";
        product2.isActive = true;
        product2.isDelete = false;
        await repo.save(product2)
        let product3 = new Product();
        product3.slug = "embody_chair";
        product3.name = "Embody Chair";
        product3.price = 1995;
        product3.description = "The Embody_Chair delivers functional ergonomic elements that do more than just mitigate the negative effects of sitting for long hours; Embody is actually health positive. Today it’s the benchmark for pressure distribution, natural alignment, and healthy movement.\n";
        product3.media = "http://api-ecommerce.mark2win.com/Embody_Chair/ig_prd_ovw_embody_chairs_01.jpg|http://api-ecommerce.mark2win.com/Embody_Chair/ig_prd_ovw_embody_chairs_02.jpg|http://api-ecommerce.mark2win.com/Embody_Chair/ig_prd_ovw_embody_chairs_03.jpg|http://api-ecommerce.mark2win.com/Embody_Chair/ig_prd_ovw_embody_chairs_04.jpg|http://api-ecommerce.mark2win.com/Embody_Chair/ig_prd_ovw_embody_chairs_05.jpg|http://api-ecommerce.mark2win.com/Embody_Chair/ig_prd_ovw_embody_chairs_06.jpg|http://api-ecommerce.mark2win.com/Embody_Chair/ig_prd_ovw_embody_chairs_07.jpg";
        product3.colorPalette = "#ffffff|#b0453f|#5f6062|#a1adad|#364757";
        product3.isActive = true;
        product3.isDelete = false;
        await repo.save(product3);
        let product4 = new Product();
        product4.slug = "mirra_2_chair";
        product4.name = "Mirra 2 Chair";
        product4.price = 930;
        product4.description = "Mirra 2 is designed for the fast-paced way that people work today. It advances how you sit by mirroring your slightest movements, expertly balancing immediate comfort and personalized ergonomics with its spry form.\n";
        product4.media = "http://api-ecommerce.mark2win.com/Mirra_2_Chair/ig_prd_ovw_mirra_2_chairs_01.jpg|http://api-ecommerce.mark2win.com/Mirra_2_Chair/ig_prd_ovw_mirra_2_chairs_02.jpg|http://api-ecommerce.mark2win.com/Mirra_2_Chair/ig_prd_ovw_mirra_2_chairs_03.jpg|http://api-ecommerce.mark2win.com/Mirra_2_Chair/ig_prd_ovw_mirra_2_chairs_04.jpg|http://api-ecommerce.mark2win.com/Mirra_2_Chair/ig_prd_ovw_mirra_2_chairs_05.jpg|http://api-ecommerce.mark2win.com/Mirra_2_Chair/ig_prd_ovw_mirra_2_chairs_06.jpg|http://api-ecommerce.mark2win.com/Mirra_2_Chair/ig_prd_ovw_mirra_2_chairs_07.jpg";
        product4.colorPalette = "#ffffff|#b0453f|#5f6062|#a1adad|#364757";
        product4.isActive = true;
        product4.isDelete = false;
        await repo.save(product4);
        let product5 = new Product();
        product5.slug = "sayl_chair";
        product5.name = "Sayl Chair";
        product5.price = 680;
        product5.description = "Showcasing the geometry of its inspiration—the Golden Gate Bridge—in the design of its signature airy back, the Sayl_Chair is everything a good office chair should be; comfortable, visually striking, and an exceptional value.\n";
        product5.media = "http://api-ecommerce.mark2win.com/Sayl_Chair/ig_prd_ovw_sayl_chairs_01.jpg|http://api-ecommerce.mark2win.com/Sayl_Chair/ig_prd_ovw_sayl_chairs_02.jpg|http://api-ecommerce.mark2win.com/Sayl_Chair/ig_prd_ovw_sayl_chairs_03.jpg|http://api-ecommerce.mark2win.com/Sayl_Chair/ig_prd_ovw_sayl_chairs_04.jpg|http://api-ecommerce.mark2win.com/Sayl_Chair/ig_prd_ovw_sayl_chairs_05.jpg|http://api-ecommerce.mark2win.com/Sayl_Chair/ig_prd_ovw_sayl_chairs_06.jpg|http://api-ecommerce.mark2win.com/Sayl_Chair/ig_prd_ovw_sayl_chairs_07.jpg";
        product5.colorPalette = "#ffffff|#b0453f|#5f6062|#a1adad|#364757";
        product5.isActive = true;
        product5.isDelete = false;
        await repo.save(product5);
        let product6 = new Product();
        product6.slug = "lino_chair";
        product6.name = "Lino Chair";
        product6.price = 725;
        product6.description = "Minimal and no-nonsense, the Lino_Chair brings scientifically backed comfort to the workplace. Meticulous attention to detail, ergonomic expertise, and clever engineering puts Lino right at the junction between comfort and value; high concept, low cost.\n";
        product6.media = "http://api-ecommerce.mark2win.com/Lino_Chair/ig_prd_ovw_lino_chairs_01.jpg|http://api-ecommerce.mark2win.com/Lino_Chair/ig_prd_ovw_lino_chairs_02.jpg|http://api-ecommerce.mark2win.com/Lino_Chair/ig_prd_ovw_lino_chairs_03.jpg|http://api-ecommerce.mark2win.com/Lino_Chair/ig_prd_ovw_lino_chairs_04.jpg|http://api-ecommerce.mark2win.com/Lino_Chair/ig_prd_ovw_lino_chairs_05.jpg|http://api-ecommerce.mark2win.com/Lino_Chair/ig_prd_ovw_lino_chairs_06.jpg";
        product6.colorPalette = "#ffffff|#b0453f|#5f6062|#a1adad|#364757";
        product6.isActive = true;
        product6.isDelete = false;
        await repo.save(product6)
        let product7 = new Product();
        product7.slug = "eames_aluminum_group_management_chair";
        product7.name = "Eames Aluminum Group Management Chair";
        product7.price = 2870;
        product7.description = "Equally classic and contemporary, the Eames_Aluminum_Group_Management_Chair is lithe, with a graceful silhouette, and, because the Eameses never favored style over substance, has an innovative suspension system that creates firm but flexible support.\n";
        product7.media = "http://api-ecommerce.mark2win.com/Eames_Aluminum_Group_Management_Chair/ig_prd_ovw_eames_aluminum_group_chairs_01.jpg|http://api-ecommerce.mark2win.com/Eames_Aluminum_Group_Management_Chair/ig_prd_ovw_eames_aluminum_group_chairs_02.jpg|http://api-ecommerce.mark2win.com/Eames_Aluminum_Group_Management_Chair/ig_prd_ovw_eames_aluminum_group_chairs_03.jpg|http://api-ecommerce.mark2win.com/Eames_Aluminum_Group_Management_Chair/ig_prd_ovw_eames_aluminum_group_chairs_04.jpg|http://api-ecommerce.mark2win.com/Eames_Aluminum_Group_Management_Chair/ig_prd_ovw_eames_aluminum_group_chairs_05.jpg|http://api-ecommerce.mark2win.com/Eames_Aluminum_Group_Management_Chair/ig_prd_ovw_eames_aluminum_group_chairs_06.jpg|http://api-ecommerce.mark2win.com/Eames_Aluminum_Group_Management_Chair/ig_prd_ovw_eames_aluminum_group_chairs_07.jpg";
        product7.colorPalette = "#ffffff|#b0453f|#5f6062|#a1adad|#364757";
        product7.isActive = true;
        product7.isDelete = false;
        await repo.save(product7);
        let product8 = new Product();
        product8.slug = "setu_chair",
        product8.name = "Setu Chair",
        product8.price = 845,
        product8.description = "The Setu_Chair is shaped for people; a true example of inspiration through observation. A unique combination of flexibility and strength meet the demands of more collaborative workplaces while the dematerialized spine bends and flexes as you do.\n",
        product8.media = "http://api-ecommerce.mark2win.com/Setu_Chair/ig_prd_ovw_setu_chair_01.jpg|http://api-ecommerce.mark2win.com/Setu_Chair/ig_prd_ovw_setu_chair_02.jpg|http://api-ecommerce.mark2win.com/Setu_Chair/ig_prd_ovw_setu_chair_03.jpg|http://api-ecommerce.mark2win.com/Setu_Chair/ig_prd_ovw_setu_chair_04.jpg|http://api-ecommerce.mark2win.com/Setu_Chair/ig_prd_ovw_setu_chair_05.jpg|http://api-ecommerce.mark2win.com/Setu_Chair/ig_prd_ovw_setu_chair_06.jpg|http://api-ecommerce.mark2win.com/Setu_Chair/ig_prd_ovw_setu_chair_07.jpg",
        product8.colorPalette = "#ffffff|#b0453f|#5f6062|#a1adad|#364757",
        product8.isActive = true,
        product8.isDelete = false,
        await repo.save(product8)
        let product9 = new Product();
        product9.slug = "eames_task_armchair__upholstered",
        product9.name = "Eames Task Armchair, Upholstered",
        product9.price = 1970,
        product9.description = "The upholstered one-piece armchair shell of this Eames Task Chair lends a touch of comfort to the workplace or home office. A selection of fine textiles makes the chair a design centerpiece, while a swivel-mounted height-adjustable seat and casters make it mobile.\n",
        product9.media = "http://api-ecommerce.mark2win.com/Eames_Task_Armchair_Upholstered/ig_prd_ovw_eames_task_chair_01.jpg|http://api-ecommerce.mark2win.com/Eames_Task_Armchair_Upholstered/ig_prd_ovw_eames_task_chair_02.jpg|http://api-ecommerce.mark2win.com/Eames_Task_Armchair_Upholstered/ig_prd_ovw_eames_task_chair_03.jpg|http://api-ecommerce.mark2win.com/Eames_Task_Armchair_Upholstered/ig_prd_ovw_eames_task_chair_04.jpg|http://api-ecommerce.mark2win.com/Eames_Task_Armchair_Upholstered/ig_prd_ovw_eames_task_chair_05.jpg|http://api-ecommerce.mark2win.com/Eames_Task_Armchair_Upholstered/ig_prd_ovw_eames_task_chair_06.jpg|http://api-ecommerce.mark2win.com/Eames_Task_Armchair_Upholstered/ig_prd_ovw_eames_task_chair_07.jpg",
        product9.colorPalette = "#ffffff|#b0453f|#5f6062|#a1adad|#364757",
        product9.isActive = true,
        product9.isDelete = false,
        await repo.save(product9)
        let product10 = new Product();
        product10.slug = "caper_multipurpose_chair",
        product10.name = "Caper Multipurpose Chair",
        product10.price = 845,
        product10.description = "Contoured for comfort, flexible for give, and versatile enough for any occasion, the Caper_Multipurpose_Chair is meant to move in and be moved; a casual yet comfortable way to pull up a chair.\n",
        product10.media = "http://api-ecommerce.mark2win.com/Caper_Multipurpose_Chair/ig_prd_ovw_caper_multipurpose_chair_01.jpg|http://api-ecommerce.mark2win.com/Caper_Multipurpose_Chair/ig_prd_ovw_caper_multipurpose_chair_02.jpg|http://api-ecommerce.mark2win.com/Caper_Multipurpose_Chair/ig_prd_ovw_caper_multipurpose_chair_03.jpg|http://api-ecommerce.mark2win.com/Caper_Multipurpose_Chair/ig_prd_ovw_caper_multipurpose_chair_04.jpg|http://api-ecommerce.mark2win.com/Caper_Multipurpose_Chair/ig_prd_ovw_caper_multipurpose_chair_05.jpg|http://api-ecommerce.mark2win.com/Caper_Multipurpose_Chair/ig_prd_ovw_caper_multipurpose_chair_06.jpg|http://api-ecommerce.mark2win.com/Caper_Multipurpose_Chair/ig_prd_ovw_caper_multipurpose_chair_07.jpg",
        product10.colorPalette = "#ffffff|#b0453f|#5f6062|#a1adad|#364757",
        product10.isActive = true,
        product10.isDelete = false,
        await repo.save(product10)

        //second page
        let product12 = new Product();
        product12.slug = "low-back_cosm_chair",
        product12.name = "Low-Back Cosm Chair",
        product12.price = 1120,
        product12.description = "A balance of sculptural form and effortless function, the Low-Back Cosm gives you instant comfort—anywhere you work. It was designed to be as ergonomically innovative as it is beautiful and automatically adjust to anyone who sits down.\n",
        product12.media = "http://api-ecommerce.mark2win.com/Low_Back_Cosm_Chair/ig_prd_ovw_cosm_chairs_01_na.jpg|http://api-ecommerce.mark2win.com/Low_Back_Cosm_Chair/ig_prd_ovw_cosm_chairs_02_na.jpg|http://api-ecommerce.mark2win.com/Low_Back_Cosm_Chair/ig_prd_ovw_cosm_chairs_03_na.jpg|http://api-ecommerce.mark2win.com/Low_Back_Cosm_Chair/ig_prd_ovw_cosm_chairs_04_na.jpg|http://api-ecommerce.mark2win.com/Low_Back_Cosm_Chair/ig_prd_ovw_cosm_chairs_05_na.jpg|http://api-ecommerce.mark2win.com/Low_Back_Cosm_Chair/ig_prd_ovw_cosm_chairs_06_na.jpg|http://api-ecommerce.mark2win.com/Low_Back_Cosm_Chair/ig_prd_ovw_cosm_chairs_07_na.jpg",
        product12.colorPalette = "#ffffff|#b0453f|#5f6062|#a1adad|#364757",
        product12.isActive = true,
        product12.isDelete = false,
        await repo.save(product12)

         let product20 = new Product();
        product20.slug = "caper_multipurpose_chair",
        product20.name = "Caper Multipurpose Chair",
        product20.price = 845,
        product20.description = "Contoured for comfort, flexible for give, and versatile enough for any occasion, the Caper_Multipurpose_Chair is meant to move in and be moved; a casual yet comfortable way to pull up a chair.\n",
        product20.media = "http://api-ecommerce.mark2win.com/Caper_Multipurpose_Chair/ig_prd_ovw_caper_multipurpose_chair_01.jpg|http://api-ecommerce.mark2win.com/Caper_Multipurpose_Chair/ig_prd_ovw_caper_multipurpose_chair_02.jpg|http://api-ecommerce.mark2win.com/Caper_Multipurpose_Chair/ig_prd_ovw_caper_multipurpose_chair_03.jpg|http://api-ecommerce.mark2win.com/Caper_Multipurpose_Chair/ig_prd_ovw_caper_multipurpose_chair_04.jpg|http://api-ecommerce.mark2win.com/Caper_Multipurpose_Chair/ig_prd_ovw_caper_multipurpose_chair_05.jpg|http://api-ecommerce.mark2win.com/Caper_Multipurpose_Chair/ig_prd_ovw_caper_multipurpose_chair_06.jpg|http://api-ecommerce.mark2win.com/Caper_Multipurpose_Chair/ig_prd_ovw_caper_multipurpose_chair_07.jpg",
        product20.colorPalette = "#ffffff|#b0453f|#5f6062|#a1adad|#364757",
        product20.isActive = true,
        product20.isDelete = false,
        await repo.save(product20)

        let product19 = new Product();
        product19.slug = "eames_task_armchair__upholstered",
        product19.name = "Eames Task Armchair, Upholstered",
        product19.price = 1970,
        product19.description = "The upholstered one-piece armchair shell of this Eames Task Chair lends a touch of comfort to the workplace or home office. A selection of fine textiles makes the chair a design centerpiece, while a swivel-mounted height-adjustable seat and casters make it mobile.\n",
        product19.media = "http://api-ecommerce.mark2win.com/Eames_Task_Armchair_Upholstered/ig_prd_ovw_eames_task_chair_01.jpg|http://api-ecommerce.mark2win.com/Eames_Task_Armchair_Upholstered/ig_prd_ovw_eames_task_chair_02.jpg|http://api-ecommerce.mark2win.com/Eames_Task_Armchair_Upholstered/ig_prd_ovw_eames_task_chair_03.jpg|http://api-ecommerce.mark2win.com/Eames_Task_Armchair_Upholstered/ig_prd_ovw_eames_task_chair_04.jpg|http://api-ecommerce.mark2win.com/Eames_Task_Armchair_Upholstered/ig_prd_ovw_eames_task_chair_05.jpg|http://api-ecommerce.mark2win.com/Eames_Task_Armchair_Upholstered/ig_prd_ovw_eames_task_chair_06.jpg|http://api-ecommerce.mark2win.com/Eames_Task_Armchair_Upholstered/ig_prd_ovw_eames_task_chair_07.jpg",
        product19.colorPalette = "#ffffff|#b0453f|#5f6062|#a1adad|#364757",
        product19.isActive = true,
        product19.isDelete = false,
        await repo.save(product19)

        let product15 = new Product();
        product15.slug = "sayl_chair",
        product15.name = "Sayl Chair",
        product15.price = 680,
        product15.description = "Showcasing the geometry of its inspiration—the Golden Gate Bridge—in the design of its signature airy back, the Sayl_Chair is everything a good office chair should be; comfortable, visually striking, and an exceptional value.\n",
        product15.media = "http://api-ecommerce.mark2win.com/Sayl_Chair/ig_prd_ovw_sayl_chairs_01.jpg|http://api-ecommerce.mark2win.com/Sayl_Chair/ig_prd_ovw_sayl_chairs_02.jpg|http://api-ecommerce.mark2win.com/Sayl_Chair/ig_prd_ovw_sayl_chairs_03.jpg|http://api-ecommerce.mark2win.com/Sayl_Chair/ig_prd_ovw_sayl_chairs_04.jpg|http://api-ecommerce.mark2win.com/Sayl_Chair/ig_prd_ovw_sayl_chairs_05.jpg|http://api-ecommerce.mark2win.com/Sayl_Chair/ig_prd_ovw_sayl_chairs_06.jpg|http://api-ecommerce.mark2win.com/Sayl_Chair/ig_prd_ovw_sayl_chairs_07.jpg",
        product15.colorPalette = "#ffffff|#b0453f|#5f6062|#a1adad|#364757",
        product15.isActive = true,
        product15.isDelete = false,
        await repo.save(product15)

        let product18 = new Product();
        product18.slug = "setu_chair",
        product18.name = "Setu Chair",
        product18.price = 845,
        product18.description = "The Setu_Chair is shaped for people; a true example of inspiration through observation. A unique combination of flexibility and strength meet the demands of more collaborative workplaces while the dematerialized spine bends and flexes as you do.\n",
        product18.media = "http://api-ecommerce.mark2win.com/Setu_Chair/ig_prd_ovw_setu_chair_01.jpg|http://api-ecommerce.mark2win.com/Setu_Chair/ig_prd_ovw_setu_chair_02.jpg|http://api-ecommerce.mark2win.com/Setu_Chair/ig_prd_ovw_setu_chair_03.jpg|http://api-ecommerce.mark2win.com/Setu_Chair/ig_prd_ovw_setu_chair_04.jpg|http://api-ecommerce.mark2win.com/Setu_Chair/ig_prd_ovw_setu_chair_05.jpg|http://api-ecommerce.mark2win.com/Setu_Chair/ig_prd_ovw_setu_chair_06.jpg|http://api-ecommerce.mark2win.com/Setu_Chair/ig_prd_ovw_setu_chair_07.jpg",
        product18.colorPalette = "#ffffff|#b0453f|#5f6062|#a1adad|#364757",
        product18.isActive = true,
        product18.isDelete = false,
        await repo.save(product18)

        let product13 = new Product();
        product13.slug = "embody_chair",
        product13.name = "Embody Chair",
        product13.price = 1995,
        product13.description = "The Embody_Chair delivers functional ergonomic elements that do more than just mitigate the negative effects of sitting for long hours; Embody is actually health positive. Today it’s the benchmark for pressure distribution, natural alignment, and healthy movement.\n",
        product13.media = "http://api-ecommerce.mark2win.com/Embody_Chair/ig_prd_ovw_embody_chairs_01.jpg|http://api-ecommerce.mark2win.com/Embody_Chair/ig_prd_ovw_embody_chairs_02.jpg|http://api-ecommerce.mark2win.com/Embody_Chair/ig_prd_ovw_embody_chairs_03.jpg|http://api-ecommerce.mark2win.com/Embody_Chair/ig_prd_ovw_embody_chairs_04.jpg|http://api-ecommerce.mark2win.com/Embody_Chair/ig_prd_ovw_embody_chairs_05.jpg|http://api-ecommerce.mark2win.com/Embody_Chair/ig_prd_ovw_embody_chairs_06.jpg|http://api-ecommerce.mark2win.com/Embody_Chair/ig_prd_ovw_embody_chairs_07.jpg",
        product13.colorPalette = "#ffffff|#b0453f|#5f6062|#a1adad|#364757",
        product13.isActive = true,
        product13.isDelete = false,
        await repo.save(product13)

        let product17 = new Product();
        product17.slug = "eames_aluminum_group_management_chair",
        product17.name = "Eames Aluminum Group Management Chair",
        product17.price = 2870,
        product17.description = "Equally classic and contemporary, the Eames_Aluminum_Group_Management_Chair is lithe, with a graceful silhouette, and, because the Eameses never favored style over substance, has an innovative suspension system that creates firm but flexible support.\n",
        product17.media = "http://api-ecommerce.mark2win.com/Eames_Aluminum_Group_Management_Chair/ig_prd_ovw_eames_aluminum_group_chairs_01.jpg|http://api-ecommerce.mark2win.com/Eames_Aluminum_Group_Management_Chair/ig_prd_ovw_eames_aluminum_group_chairs_02.jpg|http://api-ecommerce.mark2win.com/Eames_Aluminum_Group_Management_Chair/ig_prd_ovw_eames_aluminum_group_chairs_03.jpg|http://api-ecommerce.mark2win.com/Eames_Aluminum_Group_Management_Chair/ig_prd_ovw_eames_aluminum_group_chairs_04.jpg|http://api-ecommerce.mark2win.com/Eames_Aluminum_Group_Management_Chair/ig_prd_ovw_eames_aluminum_group_chairs_05.jpg|http://api-ecommerce.mark2win.com/Eames_Aluminum_Group_Management_Chair/ig_prd_ovw_eames_aluminum_group_chairs_06.jpg|http://api-ecommerce.mark2win.com/Eames_Aluminum_Group_Management_Chair/ig_prd_ovw_eames_aluminum_group_chairs_07.jpg",
        product17.colorPalette = "#ffffff|#b0453f|#5f6062|#a1adad|#364757",
        product17.isActive = true,
        product17.isDelete = false,
        await repo.save(product17)

        let product16 = new Product();
        product16.slug = "lino_chair",
        product16.name = "Lino Chair",
        product16.price = 725,
        product16.description = "Minimal and no-nonsense, the Lino_Chair brings scientifically backed comfort to the workplace. Meticulous attention to detail, ergonomic expertise, and clever engineering puts Lino right at the junction between comfort and value; high concept, low cost.\n",
        product16.media = "http://api-ecommerce.mark2win.com/Lino_Chair/ig_prd_ovw_lino_chairs_01.jpg|http://api-ecommerce.mark2win.com/Lino_Chair/ig_prd_ovw_lino_chairs_02.jpg|http://api-ecommerce.mark2win.com/Lino_Chair/ig_prd_ovw_lino_chairs_03.jpg|http://api-ecommerce.mark2win.com/Lino_Chair/ig_prd_ovw_lino_chairs_04.jpg|http://api-ecommerce.mark2win.com/Lino_Chair/ig_prd_ovw_lino_chairs_05.jpg|http://api-ecommerce.mark2win.com/Lino_Chair/ig_prd_ovw_lino_chairs_06.jpg",
        product16.colorPalette = "#ffffff|#b0453f|#5f6062|#a1adad|#364757",
        product16.isActive = true,
        product16.isDelete = false,
        await repo.save(product16)

        let product11 = new Product();
        product11.slug = "aeron_chair",
        product11.name = "Aeron Chair",
        product11.price = 1745,
        product11.description = "The Aeron_Chair combines a deep knowledge of human-centered design with cutting-edge technology. With over 7 million sold, our most admired and recognized work chair still sets the benchmark for ergonomic comfort more than 20 years after its debut.",
        product11.media = "http://api-ecommerce.mark2win.com/Aeron_Chair/ig_prd_ovw_aeron_chairs_01.jpg|http://api-ecommerce.mark2win.com/Aeron_Chair/ig_prd_ovw_aeron_chairs_02.jpg|http://api-ecommerce.mark2win.com/Aeron_Chair/ig_prd_ovw_aeron_chairs_03.jpg|http://api-ecommerce.mark2win.com/Aeron_Chair/ig_prd_ovw_aeron_chairs_04.jpg|http://api-ecommerce.mark2win.com/Aeron_Chair/ig_prd_ovw_aeron_chairs_05.jpg|http://api-ecommerce.mark2win.com/Aeron_Chair/ig_prd_ovw_aeron_chairs_06.jpg|http://api-ecommerce.mark2win.com/Aeron_Chair/ig_prd_ovw_aeron_chairs_07.jpg",
        product11.colorPalette = "#ffffff|#b0453f|#5f6062|#a1adad|#364757",
        product11.isActive = true,
        product11.isDelete = false,
        await repo.save(product11)
       
        
        let product14 = new Product();
        product14.slug = "mirra_2_chair",
        product14.name = "Mirra 2 Chair",
        product14.price = 930,
        product14.description = "Mirra 2 is designed for the fast-paced way that people work today. It advances how you sit by mirroring your slightest movements, expertly balancing immediate comfort and personalized ergonomics with its spry form.\n",
        product14.media = "http://api-ecommerce.mark2win.com/Mirra_2_Chair/ig_prd_ovw_mirra_2_chairs_01.jpg|http://api-ecommerce.mark2win.com/Mirra_2_Chair/ig_prd_ovw_mirra_2_chairs_02.jpg|http://api-ecommerce.mark2win.com/Mirra_2_Chair/ig_prd_ovw_mirra_2_chairs_03.jpg|http://api-ecommerce.mark2win.com/Mirra_2_Chair/ig_prd_ovw_mirra_2_chairs_04.jpg|http://api-ecommerce.mark2win.com/Mirra_2_Chair/ig_prd_ovw_mirra_2_chairs_05.jpg|http://api-ecommerce.mark2win.com/Mirra_2_Chair/ig_prd_ovw_mirra_2_chairs_06.jpg|http://api-ecommerce.mark2win.com/Mirra_2_Chair/ig_prd_ovw_mirra_2_chairs_07.jpg",
        product14.colorPalette = "#ffffff|#b0453f|#5f6062|#a1adad|#364757",
        product14.isActive = true,
        product14.isDelete = false,
        await repo.save(product14)


    }
}

