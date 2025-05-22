import Order from "./order";
import OrderItem from "./orderItem";

describe("Order unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            let order = new Order("", "123", []);
        }).toThrow("Id is required");

        expect(() => {
            let order = new Order("123", "", []);
        }).toThrow("CustomerId is required");

        expect(() => {
            let order = new Order("123", "123", []);
        }).toThrow("Items is required");
    });


    it("Should calculate total", () => {
        const item = new OrderItem("1", "batata", 3, "p1", 2);
        const order = new Order("1", "CUSTOMER:1", [item]);

        let total = order.total();

        expect(total).toBe(6)

        const order2 = new Order("2", "CUSTOMER:1", [item, item]);
        total = order2.total();

        expect(total).toBe(12)
    });

    it("Should throw error if the item quantity is less or equal than 0", () => {
    
        expect(() => {
            const item = new OrderItem("1", "batata", 3, "p1", 0);
            const order = new Order("1", "CUSTOMER:1", [item]);    
        }).toThrow("Quantity must be greater than 0")
    });
});


