import Address from "./address";

export default class Customer {
    _id: string;
    _name: string;
    _address!: Address;
    _active: boolean;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this._active = true;

        this.validate();
    }

    set name(name: string) {
        this._name = name;
    }

    changeName(name: string) {
        this._name = name;
    }

    activate() {
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    validate() {
        if (this._name.length === 0) {
            throw new Error("Name is required");
        }

        if (this._id.length === 0) {
            throw new Error("Id is required");
        }
    }
}