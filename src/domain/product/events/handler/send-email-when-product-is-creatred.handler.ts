import EventHandlerInterface from "../../../@shared/events/event-handler.interface";
import EventInterface from "../../../@shared/events/event.interface";

export class SendEmailWhenProductsIsCreatedHandler implements EventHandlerInterface {
    handler(event: EventInterface): void {
        console.log(`Sending email to ....`);
    }
}