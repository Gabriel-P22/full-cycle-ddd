import Order from "../../domain/entities/order";
import OrderItem from "../../domain/entities/orderItem";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRespository implements OrderRepositoryInterface {

    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.product_id,
                quantity: item.quantity
            })),
            total: entity.total()
        }, {
            include: [{ model: OrderItemModel }]
        });
    }

    async update(entity: Order): Promise<void> {
        throw new Error("need implements")
    }

    async find(id: string): Promise<Order> {
        let order;

        try {
            order = await OrderModel.findOne(
                { where: { id },
                include: [{ model: OrderItemModel }]
            });
        } catch {
            throw new Error("Order not found")
        }

        return new Order(
            order.id,
            order.customer_id,
            order.items.map(
                (item) => (
                    new OrderItem(
                        item.id,
                        item.name,
                        item.price,
                        item.product_id,
                        item.quantity
                    )
                ))
        );

    }

    async findAll(): Promise<Order[]> {
         
        throw new Error("need implements")

    }
    
}