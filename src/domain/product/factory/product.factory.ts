import Product from "../entities/product";
import ProductInterface from "../entities/product.interface";
import { v4 as uuid } from "uuid";
import ProductB from "../entities/productB";

export default class ProductFactory {
    public static create(name: string, price: number, type: string): ProductInterface {
        switch (type) {
            case "a":
                return new Product(uuid(), name, price);
            case "b":
                return new ProductB(uuid(), name, price);
            default:
                throw new Error("Product type not supported")
        }
    }
}