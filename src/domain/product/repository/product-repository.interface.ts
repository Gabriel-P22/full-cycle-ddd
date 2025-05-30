import Product from "../entities/product";
import RepositoryInterface from "../../repository/repository-interface";

export default interface ProductRepositoryInterface extends RepositoryInterface<Product> {
    
}