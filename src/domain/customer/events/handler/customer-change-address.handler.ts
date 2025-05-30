import EventHandlerInterface from "../../../@shared/events/event-handler.interface";
import EventInterface from "../../../@shared/events/event.interface";

export class CustomerChangeAddressEventHandler implements EventHandlerInterface {
    handler(event: EventInterface): void {
        console.log(`Endereço do cliente: ${event.eventData.customer.id}, ${event.eventData.customer.nome} alterado para: ${event.eventData.customer.address}`);
    }
}