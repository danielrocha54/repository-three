import { Product } from './product';
import { Category } from './category';
import { ProductPurchase } from './purchase';


export class Cart {

	private _categories: Category[];

	constructor() {
		this._categories = [];
	}

	public get categories(): Category[] {
		return this._categories;
	}

	public setCategory(c: Category) {
		this._categories.push(c);
	}

	public get products(): ProductPurchase[] {

		let result: ProductPurchase[] = [];

		for ( let category of this._categories ) {

			for ( let product of category.products ) {

				if ( product.quantity > 0 ) {

					result.push(new ProductPurchase(product.id, product.quantity));

				}

			}

		}

		return result;

	}

}