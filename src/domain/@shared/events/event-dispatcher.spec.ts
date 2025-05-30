import { CustomerCreatedHandlerFirstCase } from "../../customer/events/handler/customer-created-first-case.handler";
import { CustomerCreatedHandlerSecondCase } from "../../customer/events/handler/customer-created-second-case.handler";
import { SendEmailWhenProductsIsCreatedHandler } from "../../product/events/handler/send-email-when-product-is-creatred.handler";
import { CustomerChangeAddressEventHandler } from "../../customer/events/handler/customer-change-address.handler";
import ProductCreatedEvent from "../../product/events/product-created.event";
import EventDispatcher from "./event-dispatcher";
import Customer from "../../customer/entities/customer";
import CustomerCreatedEvent from "../../customer/events/customer-created.event";
import Address from "../../customer/vo/address";
import CustomerChangeAddressEvent from "../../customer/events/customer-change-address.event";

describe("Domain events tests", () => {
    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductsIsCreatedHandler();

        const eventName = "ProductCreatedEvent";

        eventDispatcher.register(eventName, eventHandler);

        expect(eventDispatcher.getEventHandlers[eventName]).toBeDefined();
        expect(eventDispatcher.getEventHandlers[eventName].length).toBe(1);
        expect(eventDispatcher.getEventHandlers[eventName][0]).toMatchObject(eventHandler);
    });


    it("should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductsIsCreatedHandler();

        const eventName = "ProductCreatedEvent";

        eventDispatcher.register(eventName, eventHandler);

        expect(eventDispatcher.getEventHandlers[eventName]).toBeDefined();
        expect(eventDispatcher.getEventHandlers[eventName].length).toBe(1);
        expect(eventDispatcher.getEventHandlers[eventName][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister(eventName, eventHandler);
        expect(eventDispatcher.getEventHandlers[eventName].length).toBe(0);

    });

    it("should unregister all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductsIsCreatedHandler();

        const eventName = "ProductCreatedEvent";

        eventDispatcher.register(eventName, eventHandler);

        expect(eventDispatcher.getEventHandlers[eventName]).toBeDefined();
        expect(eventDispatcher.getEventHandlers[eventName].length).toBe(1);
        expect(eventDispatcher.getEventHandlers[eventName][0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();
        expect(eventDispatcher.getEventHandlers[eventName]).toBeUndefined();
    });

    it("should notify all event handlers", () => {
        const eventDispatcher = new EventDispatcher();

        const eventHandler = new SendEmailWhenProductsIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handler");

        const eventName = "ProductCreatedEvent";

        eventDispatcher.register(eventName, eventHandler);

        expect(eventDispatcher.getEventHandlers[eventName]).toBeDefined();
        expect(eventDispatcher.getEventHandlers[eventName].length).toBe(1);
        expect(eventDispatcher.getEventHandlers[eventName][0]).toMatchObject(eventHandler);        

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            description: "Product 1 description",
            price: 10.0
        });

        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });

    it("Should create an Customer", () => {
        const eventDispatcher = new EventDispatcher();

        const eventHandlerFirstCase = new CustomerCreatedHandlerFirstCase();
        const eventHandlerSecondCase = new CustomerCreatedHandlerSecondCase();

        const eventName = "CustomerCreatedEvent";

        eventDispatcher.register(eventName, eventHandlerFirstCase);
        eventDispatcher.register(eventName, eventHandlerSecondCase);

        expect(eventDispatcher.getEventHandlers[eventName]).toBeDefined();

        expect(eventDispatcher.getEventHandlers[eventName].length).toBe(2);

        expect(eventDispatcher.getEventHandlers[eventName][0]).toMatchObject(eventHandlerFirstCase);
        expect(eventDispatcher.getEventHandlers[eventName][1]).toMatchObject(eventHandlerSecondCase);
    });

    it("should unregister an Customer event handler", () => {
        const eventDispatcher = new EventDispatcher();

        const eventHandlerFirstCase = new CustomerCreatedHandlerFirstCase();
        const eventHandlerSecondCase = new CustomerCreatedHandlerSecondCase();

        const eventName = "CustomerCreatedEvent";

        eventDispatcher.register(eventName, eventHandlerFirstCase);
        eventDispatcher.register(eventName, eventHandlerSecondCase);

        expect(eventDispatcher.getEventHandlers[eventName]).toBeDefined();

        expect(eventDispatcher.getEventHandlers[eventName].length).toBe(2);

        expect(eventDispatcher.getEventHandlers[eventName][0]).toMatchObject(eventHandlerFirstCase);
        expect(eventDispatcher.getEventHandlers[eventName][1]).toMatchObject(eventHandlerSecondCase);

        eventDispatcher.unregister(eventName, eventHandlerFirstCase);
        eventDispatcher.unregister(eventName, eventHandlerSecondCase);

        expect(eventDispatcher.getEventHandlers[eventName].length).toBe(0);
    });

    it("should unregister all Customer event handlers", () => {
        const eventDispatcher = new EventDispatcher();

        const eventHandlerFirstCase = new CustomerCreatedHandlerFirstCase();
        const eventHandlerSecondCase = new CustomerCreatedHandlerSecondCase();

        const eventName = "CustomerCreatedEvent";

        eventDispatcher.register(eventName, eventHandlerFirstCase);
        eventDispatcher.register(eventName, eventHandlerSecondCase);

        expect(eventDispatcher.getEventHandlers[eventName]).toBeDefined();

        expect(eventDispatcher.getEventHandlers[eventName].length).toBe(2);

        expect(eventDispatcher.getEventHandlers[eventName][0]).toMatchObject(eventHandlerFirstCase);
        expect(eventDispatcher.getEventHandlers[eventName][1]).toMatchObject(eventHandlerSecondCase);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers[eventName]).toBeUndefined();
    });

    it("should notify all Customer event handlers", () => {
        const eventDispatcher = new EventDispatcher();

        const eventHandlerFirstCase = new CustomerCreatedHandlerFirstCase();
        const eventHandlerSecondCase = new CustomerCreatedHandlerSecondCase();

        const eventHandlerFirstCaseSpy = jest.spyOn(eventHandlerFirstCase, "handler");
        const eventHandlerSecondCaseSpy = jest.spyOn(eventHandlerSecondCase, "handler");

        const eventName = "CustomerCreatedEvent";

        eventDispatcher.register(eventName, eventHandlerFirstCase);
        eventDispatcher.register(eventName, eventHandlerSecondCase);

        expect(eventDispatcher.getEventHandlers[eventName]).toBeDefined();

        expect(eventDispatcher.getEventHandlers[eventName].length).toBe(2);

        expect(eventDispatcher.getEventHandlers[eventName][0]).toMatchObject(eventHandlerFirstCase);
        expect(eventDispatcher.getEventHandlers[eventName][1]).toMatchObject(eventHandlerSecondCase);

        const customer = new Customer("1", "Customer");

        const customerCreatedFirstCase = new CustomerCreatedEvent(customer);

        eventDispatcher.notify(customerCreatedFirstCase);

        expect(eventHandlerFirstCaseSpy).toHaveBeenCalled();
        expect(eventHandlerSecondCaseSpy).toHaveBeenCalled();
    });


    it("Should update Customer address", () => {
        const eventDispatcher = new EventDispatcher();

        const eventHandler = new CustomerChangeAddressEventHandler();
        const eventName = "CustomerChangeAddressEvent";

        eventDispatcher.register(eventName, eventHandler);

        expect(eventDispatcher.getEventHandlers[eventName]).toBeDefined();
        expect(eventDispatcher.getEventHandlers[eventName].length).toBe(1);
        expect(eventDispatcher.getEventHandlers[eventName][0]).toMatchObject(eventHandler);
    });

    it("Shoul unregister an Address event address", () => {
        const eventDispatcher = new EventDispatcher();

        const eventHandler = new CustomerChangeAddressEventHandler();
        const eventName = "CustomerChangeAddressEvent";

        eventDispatcher.register(eventName, eventHandler);

        expect(eventDispatcher.getEventHandlers[eventName]).toBeDefined();
        expect(eventDispatcher.getEventHandlers[eventName].length).toBe(1);
        expect(eventDispatcher.getEventHandlers[eventName][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister(eventName, eventHandler);

        expect(eventDispatcher.getEventHandlers[eventName].length).toBe(0);
    });

    it("Should notify customer update address event", () => {
        const eventDispatcher = new EventDispatcher();

        const eventHandler = new CustomerChangeAddressEventHandler();
        const eventHandlerSpy = jest.spyOn(eventHandler, "handler");

        const eventName = "CustomerChangeAddressEvent";

        eventDispatcher.register(eventName, eventHandler);

        expect(eventDispatcher.getEventHandlers[eventName]).toBeDefined();
        expect(eventDispatcher.getEventHandlers[eventName].length).toBe(1);
        expect(eventDispatcher.getEventHandlers[eventName][0]).toMatchObject(eventHandler);

        const customer = new Customer("1", "First Customer");
        customer.address = new Address("Street", 1, "11111", "RJ");

        const event = {
            customer
        }

        const changeAddressEvent = new CustomerChangeAddressEvent(event)

        eventDispatcher.notify(changeAddressEvent);

        expect(eventHandlerSpy).toHaveBeenCalled();
    })

    it("Shoul unregister an Address event address", () => {
        const eventDispatcher = new EventDispatcher();

        const eventHandler = new CustomerChangeAddressEventHandler();
        const eventName = "CustomerChangeAddressEvent";

        eventDispatcher.register(eventName, eventHandler);

        expect(eventDispatcher.getEventHandlers[eventName]).toBeDefined();
        expect(eventDispatcher.getEventHandlers[eventName].length).toBe(1);
        expect(eventDispatcher.getEventHandlers[eventName][0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers[eventName]).toBeUndefined();
    });
})