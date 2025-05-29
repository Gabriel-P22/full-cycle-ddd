import EventHandlerInterface from "../../@shared/event-handler.interface";
import EventInterface from "../../@shared/event.interface";

export class SendEmailWhenProductsIsCreatedHandler implements EventHandlerInterface {
    handler(event: EventInterface): void {
        console.log(`Sending email to ....`);
    }
}