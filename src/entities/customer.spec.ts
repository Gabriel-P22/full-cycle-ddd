import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {
    
    it("Should throw error when id is empty", () => {
        expect(() => {
            const customer = new Customer("", "USER_TEST");
        }).toThrow("Id is required");
    });


    it("Should throw error when name is empty", () => {

        expect(() => {
            const customer = new Customer("123", "");
        }).toThrow("Name is required");
        
    });

    it("Should change name", () => {
        const customer = new Customer("1", "Jhon");
        customer.changeName("Jane");

        expect(customer.name).toBe("Jane");
    });

    it("Should activate customer", () => {
        const customer = new Customer("1", "Jhon");
        const address = new Address("STREET_A", 1, "1AB", "STREET");

        customer.address = address;
        customer.activate();

        expect(customer.isActive()).toBe(true);
    });

    it("Should diactivate customer", () => {
        const customer = new Customer("1", "Jhon");
        customer.deactivate();

        expect(customer.isActive()).toBe(false);
    });


    it("Should throw error when address is undefined", () => {
        
        expect(() => {
            const customer = new Customer("1", "Jhon");
            customer.activate();
        }).toThrow("Address is mandatory to activate a customer");
        
    });

    it("Should add reward points", () => {
        const customer = new Customer("1", "Jhon");
        expect(customer.rewardsPoints).toBe(0);


        customer.addRewardPoints(10);
        expect(customer.rewardsPoints).toBe(10);

        customer.addRewardPoints(10);
        expect(customer.rewardsPoints).toBe(20);
    });
});


