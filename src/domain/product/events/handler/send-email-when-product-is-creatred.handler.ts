import EventHandlerInterface from "../../../events/@shared/event-handler.interface";
import EventInterface from "../../../events/@shared/event.interface";

export class SendEmailWhenProductsIsCreatedHandler implements EventHandlerInterface {
    handler(event: EventInterface): void {
        console.log(`Sending email to ....`);
    }
}