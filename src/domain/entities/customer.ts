import Address from "./address";

export default class Customer {
    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active: boolean;
    private _rewardsPoints: number = 0;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this._active = true;

        this.validate();
    }

    set name(name: string) {
        this._name = name;
    }

    get name(): string {
        return this._name;
    }

    set address(address: Address) {
        this._address = address;
    }

    get address(): Address {
        return this._address;
    }

    get rewardsPoints(): number {
        return this._rewardsPoints;
    }

    get id(): string {
        return this._id;
    }

    changeName(name: string) {
        this._name = name;
    }

    activate() {
        
        if (this._address === undefined) {
            throw new Error("Address is mandatory to activate a customer");
        }

        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    isActive(): boolean {
        return this._active;
    }

    addRewardPoints(points: number) {
        this._rewardsPoints += points;
    }

    validate() {
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }

        if (this._name.length === 0) {
            throw new Error("Name is required");
        }
    }
}