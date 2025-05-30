import EventHandlerInterface from "../../@shared/event-handler.interface";
import EventInterface from "../../@shared/event.interface";

export class CustomerCreatedHandlerSecondCase implements EventHandlerInterface {
    handler(event: EventInterface): void {
        console.log("Esse é o segundo console.log do evento: CustomerCreated");
    }
}