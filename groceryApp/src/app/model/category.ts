import { Product } from './product';

export class Category {

	private _id: number;
	private _name: string;
	private _products: Product[];

	constructor(id: number, name: string) {
		this._id = id;
		this._name = name;
		this._products = [];
	}

	public get id(): number {
		return this._id;
	}

	public get name(): string {
		return this._name;
	}

	public get products(): Product[] {
		return this._products;
	}

	public setProduct(p: Product) {
		this._products.push(p);
	}

}