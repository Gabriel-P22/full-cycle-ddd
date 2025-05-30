import Customer from "../../customer/entities/customer";
import EventInterface from "../../events/@shared/event.interface";

interface CustomerChangeAddressEventInterface {
    customer: Customer,
}

export default class CustomerChangeAddressEvent implements EventInterface {
    dataTimeOcurred: Date;
    eventData: CustomerChangeAddressEventInterface;
    
    constructor(eventData: CustomerChangeAddressEventInterface) {
        this.dataTimeOcurred = new Date();
        this.eventData = eventData;
    }
}