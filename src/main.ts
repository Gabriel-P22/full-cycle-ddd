import Address from "./entities/address";
import Customer from "./entities/customer";
import Order from "./entities/order";
import OrderItem from "./entities/orderItem";

let customer = new Customer("123", "Gabriel");
let address = new Address("Rua do JJ", 2, "12345-678", "Rio de Janeiro");

customer._address = address;

customer.activate();

const itemUm = new OrderItem("1", "Item 1", 10);
const itemDois = new OrderItem("2", "Item 2", 15);


const order = new Order("1", "123", [itemUm, itemDois]);

