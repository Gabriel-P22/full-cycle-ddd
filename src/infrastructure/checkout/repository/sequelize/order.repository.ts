import Order from "../../../../domain/checkout/entities/order";
import OrderItem from "../../../../domain/checkout/entities/orderItem";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
import ProductModel from "../../../product/repository/sequelize/product.model";

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
            include: [{ model: OrderItemModel, as: "items" }]
        });
    }

    async update(entity: Order): Promise<void> {
        await OrderModel.update(
            {
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.total()
            },
            {
                where: { id: entity.id }
            }
        );

        OrderItemModel.destroy({
            where: { order_id: entity.id }
        });

        entity.items.forEach(async (item) => {
            OrderItemModel.create(
                {
                    id: item.id,
                    order_id: entity.id,
                    product_id: item.productId,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price
                },
                {
                    include: [ { model: ProductModel } ]
                }
            );
        });
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
        const orders = await OrderModel.findAll({
            include: [{ model: OrderItemModel }]
        });
        
        return orders.map((order) => 
            new Order(
                order.id,
                order.customer_id,
                order.items.map((item) => (
                    new OrderItem(
                        item.id,
                        item.name,
                        item.price,
                        item.product_id,
                        item.quantity
                    )
                ))
            ))
    }
    
}