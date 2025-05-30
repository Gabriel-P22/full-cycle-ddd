import EventHandlerInterface from "../../../events/@shared/event-handler.interface";
import EventInterface from "../../../events/@shared/event.interface";

export class CustomerCreatedHandlerFirstCase implements EventHandlerInterface {
    handler(event: EventInterface): void {
        console.log("Esse é o primeiro console.log do evento: CustomerCreated");
    }
}