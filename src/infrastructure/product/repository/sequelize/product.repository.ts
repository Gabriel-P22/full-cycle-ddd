import Product from "../../../../domain/product/entities/product";
import ProductRepositoryInterface from "../../../../domain/product/repository/product-repository.interface";
import ProductModel from "./product.model";

export default class ProductRespository implements ProductRepositoryInterface {

    async create(entity: Product): Promise<void> {

        await ProductModel.create({
            id: entity.id,
            name: entity.name,
            price: entity.price
        });
    }

    async update(entity: Product): Promise<void> {
        await ProductModel.update(
            { 
                name: entity.name,
                price: entity.price
            },
            {
                where: {
                    id: entity.id
                },
            }
        );
    }

    async find(id: string): Promise<Product> {
        const productModel = await ProductModel.findOne({ where: { id }});

        return new Product(
            productModel.id,
            productModel.name,
            productModel.price
        )
    }

    async findAll(): Promise<Product[]> {
        const products = await ProductModel.findAll();

        return products.map((model) => 
            new Product(model.id, model.name, model.price)
        )
    }
    
}