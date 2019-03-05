
export class Product {

	private _id: number;
	private _product_name: string;
	private _price: number;
	private _quantity: number;
	private _erase: boolean;

	constructor(id: number, product_name: string, price: number) {
		this._id = id;
		this._product_name = product_name;
		this._price = price;
		this._quantity = 0;
		this._erase = true;
	}

	public get id(): number {
		return this._id;
	}

	public get name(): string {
		return this._product_name;
	}

	public get price(): number {
		return this._price;
	}

	public get quantity(): number {
		return this._quantity;
	}

	public set quantity(quantity: number) {
		this._quantity = quantity;
	}

	public get erase(): boolean {
		return this._erase;
	}

	public set erase(erase: boolean) {
		this._erase = erase;
	}

}