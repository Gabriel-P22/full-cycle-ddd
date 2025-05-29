import { SendEmailWhenProductsIsCreatedHandler } from "../product/handler/send-email-when-product-is-creatred.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EventDispatcher from "./event-dispatcher";

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
})