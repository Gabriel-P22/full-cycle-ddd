import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRespository from "./customer.repository";
import Customer from "../../domain/entities/customer";
import Address from "../../domain/entities/address";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import ProductModel from "../db/sequelize/model/product.model";
import ProductRespository from "./product.repository";
import Product from "../../domain/entities/product";
import OrderItem from "../../domain/entities/orderItem";
import Order from "../../domain/entities/order";
import OrderRespository from "./order.repository";

describe("Order repository test", () => {

    let sequilize: Sequelize;

    beforeEach(async () => {
        sequilize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequilize.addModels([   
            CustomerModel,
            OrderModel,
            OrderItemModel,
            ProductModel]);
        await sequilize.sync();
    });

    afterEach(async () => {
        await sequilize.close();
    });

    it("Should create a new order", async () => {
        const customerRespository = new CustomerRespository();
        const customer = new Customer("1", "Customer_1");
        const address = new Address("Street 1", 1, "Z1", "RJ");
        customer.address = address;
        await customerRespository.create(customer);

        const productRespository = new ProductRespository();
        const product = new Product("1", "Product 1", 100);
        await productRespository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );

        const order = new Order("1", customer.id, [orderItem]);


        const orderRespository = new OrderRespository();
        await orderRespository.create(order);

        const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] })

        expect(orderModel.toJSON()).toStrictEqual({
            id: "1",
            customer_id: customer.id,
            total: order.total(),
            items: [{
                id: orderItem.id,
                name: orderItem.name,
                price: orderItem.price,
                order_id: "1",
                product_id: "1",
                quantity: 2
            }]
        })
    });
});