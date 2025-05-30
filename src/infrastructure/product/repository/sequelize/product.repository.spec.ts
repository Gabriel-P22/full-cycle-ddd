import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.model";
import Product from "../../../../domain/product/entities/product";
import ProductRespository from "./product.repository";

describe("Product repository test", () => {

    let sequilize: Sequelize;

    beforeEach(async () => {
        sequilize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequilize.addModels([ProductModel]);
        await sequilize.sync();
    });

    afterEach(async () => {
        await sequilize.close();
    });

    it("Should create a product", async () => {
        const productRespository = new ProductRespository();

        const product = new Product("1", "food", 100);
        await productRespository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "1" }});

        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "food",
            price: 100
        });
    });

    it("Should updates a product", async () => {
        const productRespository = new ProductRespository();

        const product = new Product("1", "food", 100);
        await productRespository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "1" }});

        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "food",
            price: 100
        });

        product.changeName("ABC");
        product.changePrice(150);

        await productRespository.update(product);

        const updatedModel = await ProductModel.findOne({ where: { id: "1" }});


        expect(updatedModel.toJSON()).toStrictEqual({
            id: "1",
            name: "ABC",
            price: 150
        });
    });

    it("Should find a product", async () => {
        const productRespository = new ProductRespository();

        const product = new Product("1", "food", 100);
        await productRespository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "1" }});
        const foundProduct = await productRespository.find("1");

        expect(productModel.toJSON()).toStrictEqual({
            id: foundProduct.id,
            name: foundProduct.name,
            price: foundProduct.price
        });
    });

    it("Should find all product", async () => {
        const productRespository = new ProductRespository();

        const productOne = new Product("1", "food", 100);
        const productTwo = new Product("2", "food", 100);

        await productRespository.create(productOne);
        await productRespository.create(productTwo);


        const foundProducts = await productRespository.findAll();

        expect([productOne, productTwo]).toEqual(foundProducts)
        expect(foundProducts.length).toBe(2)
    });
});