import Order from "../../checkout/entities/order";
import OrderItem from "../../checkout/entities/orderItem";
import Product from "./product";

describe("Product unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            const product = new Product("", "product 1", 100);
        }).toThrow("Id is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            const product = new Product("123", "", 100);
        }).toThrow("Name is required");
    });

    it("should throw error when price is less than zero", () => {
        expect(() => {
            const product = new Product("123", "product", -1);
        }).toThrow("Price must be greater then zero");
    });


    it("should change name", () => {
        const product = new Product("123", "product", 1);
        product.changeName("Product2");
        expect(product.name).toBe("Product2")
    });

    it("should change price", () => {
        const product = new Product("123", "product", 1);
        product.changePrice(2);
        expect(product.price).toBe(2)
    });
});


