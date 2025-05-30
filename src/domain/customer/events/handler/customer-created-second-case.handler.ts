import EventHandlerInterface from "../../../@shared/events/event-handler.interface";
import EventInterface from "../../../@shared/events/event.interface";

export class CustomerCreatedHandlerSecondCase implements EventHandlerInterface {
    handler(event: EventInterface): void {
        console.log("Esse é o segundo console.log do evento: CustomerCreated");
    }
}