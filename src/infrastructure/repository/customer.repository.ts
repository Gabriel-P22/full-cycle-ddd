import Address from "../../domain/entities/address";
import Customer from "../../domain/entities/customer";
import CustomerRepositoryInterface from "../../domain/repository/customer-repository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";

export default class CustomerRespository implements CustomerRepositoryInterface {

    async create(entity: Customer): Promise<void> {

        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.address.street,
            number: entity.address.number,
            zipcode: entity.address.zip,
            city: entity.address.city,
            active: entity.active,
            rewardsPoints: entity.rewardsPoints
          });
          
    }

    async update(entity: Customer): Promise<void> {
        await CustomerModel.update(
            { 
                name: entity.name,
                street: entity.address.street,
                number: entity.address.number,
                zipcode: entity.address.zip,
                city: entity.address.city,
                active: entity.active,
                rewardsPoints: entity.rewardsPoints
            },
            {
                where: {
                    id: entity.id
                },
            }
        );
    }

    async find(id: string): Promise<Customer> {
        const productModel = await CustomerModel.findOne({ where: { id }});

        const customer = new Customer(
            productModel.id,
            productModel.name
        );

        
        customer.address = new Address(
            productModel.street,
            productModel.number,
            productModel.zipcode,
            productModel.city,
        );

        return customer;
    }

    async findAll(): Promise<Customer[]> {
        const products = await CustomerModel.findAll();

        return products.map((model) => {
            const customer = new Customer(
                model.id,
                model.name
            );
    
            
            customer.address = new Address(
                model.street,
                model.number,
                model.zipcode,
                model.city,
            );

            return customer
    
        });
    }
    
}