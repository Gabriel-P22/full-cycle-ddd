import { Sequelize } from "sequelize-typescript";
import ProductModel from "../db/sequelize/model/product.model";
import Product from "../../domain/entities/product";
import ProductRespository from "./product.repository";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRespository from "./customer.repository";
import Customer from "../../domain/entities/customer";
import Address from "../../domain/entities/address";

describe("Product repository test", () => {

    let sequilize: Sequelize;

    beforeEach(async () => {
        sequilize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequilize.addModels([CustomerModel]);
        await sequilize.sync();
    });

    afterEach(async () => {
        await sequilize.close();
    });

    it("Should create a customer", async () => {
        const productRespository = new CustomerRespository();

        const customer = new Customer("c1", "Customer_1");
        customer.address = new Address("street_1", 1, "A1", "Rio de janeiro");

        await productRespository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "c1" }});

        expect(customerModel.toJSON()).toStrictEqual({
            active: true,
            city: customer.address.city,
            id: customer.id,
            name: customer.name,
            number: customer.address.number,
            street: customer.address.street,
            zipcode: customer.address.zip,
            rewardsPoints: customer.rewardsPoints,
        });
    });

    it("Should update a product", async () => {
        const customerRespository = new CustomerRespository();

        const customer = new Customer("1", "Customer");
        customer.address = new Address("street_1", 1, "A1", "Rio de janeiro");

        await customerRespository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "1" }});

        expect(customerModel.toJSON()).toStrictEqual({
            active: true,
            city: customer.address.city,
            id: customer.id,
            name: customer.name,
            number: customer.address.number,
            street: customer.address.street,
            zipcode: customer.address.zip,
            rewardsPoints: customer.rewardsPoints,
        });

        customer.changeName("ABC");

        await customerRespository.update(customer);

        const updatedModel = await CustomerModel.findOne({ where: { id: "1" }});


        expect(updatedModel.toJSON()).toStrictEqual({
            active: true,
            city: customer.address.city,
            id: customer.id,
            name: customer.name,
            number: customer.address.number,
            street: customer.address.street,
            zipcode: customer.address.zip,
            rewardsPoints: customer.rewardsPoints,
        });
    });

    it("Should find a product", async () => {
        const customerRespository = new CustomerRespository();

        const customer = new Customer("c1", "Customer_1");
        customer.address = new Address("street_1", 1, "A1", "Rio de janeiro");

        await customerRespository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "c1" }});
        const foundCustomer = await customerRespository.find("c1");

        expect(customerModel.toJSON()).toStrictEqual({
            active: true,
            city: foundCustomer.address.city,
            id: foundCustomer.id,
            name: foundCustomer.name,
            number: foundCustomer.address.number,
            street: foundCustomer.address.street,
            zipcode: foundCustomer.address.zip,
            rewardsPoints: foundCustomer.rewardsPoints,
        });
    });

    it("Should find all product", async () => {
        const customerRespository = new CustomerRespository();

        const customerOne = new Customer("c1", "Customer_1");
        customerOne.address = new Address("street_1", 1, "A1", "Rio de janeiro");

        const customerTwo = new Customer("c2", "Customer_2");
        customerTwo.address = new Address("street_1", 1, "A1", "Rio de janeiro");

        await customerRespository.create(customerOne);
        await customerRespository.create(customerTwo);


        const foundProducts = await customerRespository.findAll();

        expect([customerOne, customerTwo]).toEqual(foundProducts)
        expect(foundProducts.length).toBe(2)
    });

    it("Should throw an error when customer not found", async () => {
        const customerRespository = new CustomerRespository();

        await expect(customerRespository.find("123")).rejects.toThrow("Customer not found");
    });
});