import Customer from "../entities/customer";
import Order from "../entities/order";
import OrderItem from "../entities/orderItem";
import OrderService from "./order.service";

describe("Order service unit tests", () => {

    it("should place an order", () => {
        const customer = new Customer("c1", "Customer 1");
        const itemOne = new OrderItem("i1", "Item 1", 10, "p1", 1);

        const order = OrderService.placeOrder(customer, [itemOne]);

        expect(customer.rewardsPoints).toBe(5);
        expect(order.total()).toBe(10);
    });

    it("Should get total of all orders", () => {

        const orderItemOne = new OrderItem("i1", "pizza", 100, "p1", 1);
        const orderItemTwo = new OrderItem("i2", "hamburguer", 200, "p2", 2);

        const orderOne = new Order("o1", "c1", [orderItemOne]);
        const orderTwo = new Order("o1", "c1", [orderItemTwo]);

        const total = OrderService.total([orderOne, orderTwo]);

        expect(total).toBe(500);
    });
});