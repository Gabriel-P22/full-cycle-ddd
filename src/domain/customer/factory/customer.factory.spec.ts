import Address from "../vo/address";
import CustomerFactory from "./customer.factory";

describe("Customer Factory unit test", () => {
    it("Should create a Customer", () => {
        let customer = CustomerFactory.create("John");

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.address).toBeUndefined();
    });

    it("Should create a Customer with address", () => {
        let address = new Address("Street", 1, "123", "RJ")
        let customer = CustomerFactory.createWithAddress("John", address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.address).toBeDefined();
    });
});