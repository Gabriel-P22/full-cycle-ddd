import EventHandlerInterface from "../../../@shared/events/event-handler.interface";
import EventInterface from "../../../@shared/events/event.interface";

export class CustomerCreatedHandlerFirstCase implements EventHandlerInterface {
    handler(event: EventInterface): void {
        console.log("Esse é o primeiro console.log do evento: CustomerCreated");
    }
}