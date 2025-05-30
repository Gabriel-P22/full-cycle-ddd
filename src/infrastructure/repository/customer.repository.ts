import Address from "../../domain/customer/vo/address";
import Customer from "../../domain/customer/entities/customer";
import CustomerRepositoryInterface from "../../domain/customer/repository/customer-repository.interface";
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
        let customerModel;

        try {
            customerModel = await CustomerModel.findOne({ 
                where: { id },
                rejectOnEmpty: true
            });
        } catch {
            throw new Error("Customer not found");
        }


        const customer = new Customer(
            customerModel.id,
            customerModel.name
        );

        
        customer.address = new Address(
            customerModel.street,
            customerModel.number,
            customerModel.zipcode,
            customerModel.city,
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

            if(customer.isActive) {
                customer.activate()
            }

            customer.addRewardPoints(model.rewardsPoints);
            
            return customer
    
        });
    }
    
}