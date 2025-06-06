import ProductInterface from "./product.interface";

export default class ProductB implements ProductInterface {

    private _id: string;
    private _name: string;
    private _price: number;

    constructor(id: string, name: string, price: number) {
        this._id = id;
        this._name = name;
        this._price = price;
        this.validate()
    }

    validate() {
        if (this._id.length === 0) {
            throw new Error("Id is required")
        }

        if (this._name.length === 0) {
            throw new Error("Name is required")
        }

        if (this._price <= 0) {
            throw new Error("Price must be greater then zero")
        }

        return true;
    }

    get name(): string {
        return this._name
    }

    get price() {
        return this._price * 2;
    }

    get id() {
        return this._id;
    }

    changeName(value: string) {
        this._name = value;
        this.validate();
    }

    changePrice(value: number) {
        this._price = value;
        this.validate();
    }

}