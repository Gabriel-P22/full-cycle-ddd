import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import CustomerRespository from "../../../customer/repository/sequelize/customer.repository";
import Customer from "../../../../domain/customer/entities/customer";
import Address from "../../../../domain/customer/vo/address";
import OrderModel from "./order.model";
import OrderItemModel from "./order-item.model";
import ProductModel from "../../../product/repository/sequelize/product.model";
import ProductRespository from "../../../product/repository/sequelize/product.repository";
import Product from "../../../../domain/product/entities/product";
import OrderItem from "../../../../domain/checkout/entities/orderItem";
import Order from "../../../../domain/checkout/entities/order";
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

    it("Should update a order", async () => {
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
        const orderItemTwo = new OrderItem(
            "2",
            product.name,
            product.price,
            product.id,
            2
        );

        const order = new Order("1", customer.id, [orderItem]);

        const orderRespository = new OrderRespository();
        await orderRespository.create(order);

        const orderModel = await orderRespository.find(order.id);

        orderModel.addItems(orderItemTwo);
        await orderRespository.update(order);

        expect(orderModel.items.length).toBe(2);
    });


    it("Should find a order by id", async () => {
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

        const orderFound = await orderRespository.find(order.id)

        expect(orderFound).toStrictEqual(order);
    });

    it("Should find all order", async () => {

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
        const orderItemTwo = new OrderItem(
            "2",
            product.name,
            product.price,
            product.id,
            2
        );

        const orderOne = new Order("1", customer.id, [orderItem]);
        const orderTwo = new Order("2", customer.id, [orderItemTwo]);


        const orderRespository = new OrderRespository();

        await orderRespository.create(orderOne);
        await orderRespository.create(orderTwo);


        const orders = await orderRespository.findAll()

        expect(orders.length).toBe(2);
        expect(orders[0]).toStrictEqual(orderOne)
        expect(orders[1]).toStrictEqual(orderTwo)
    });
});