import EventHandlerInterface from "../../../events/@shared/event-handler.interface";
import EventInterface from "../../../events/@shared/event.interface";

export class CustomerChangeAddressEventHandler implements EventHandlerInterface {
    handler(event: EventInterface): void {
        console.log(`Endereço do cliente: ${event.eventData.customer.id}, ${event.eventData.customer.nome} alterado para: ${event.eventData.customer.address}`);
    }
}