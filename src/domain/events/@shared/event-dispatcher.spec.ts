import { SendEmailWhenProductsIsCreatedHandler } from "../product/handler/send-email-when-product-is-creatred.handler";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductsIsCreatedHandler();

        const eventName = "ProductCreatedEvent";


        eventDispatcher.register(eventName, eventHandler);

        expect(eventDispatcher.getEventHandlers[eventName]).toBeDefined()
        expect(eventDispatcher.getEventHandlers[eventName].length).toBe(1)


    })
})