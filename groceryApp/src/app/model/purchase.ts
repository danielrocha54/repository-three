
export class ProductPurchase {

	private _product_id: number;
	private _quantity: number;

	constructor( product_id: number, quantity: number ) {
		
		this._product_id = product_id;
		this._quantity = quantity;
	}

	public get productId(): number {
		return this._product_id;
	}
	public set productId(product_id: number) {
		this._product_id = product_id;
	}

	public get quantity(): number {
		return this._quantity;
	}
	public set quantity(quantity: number) {
		this._quantity = quantity;
	}

}

export class Purchase {

	private _client_name: string;
	private _client_email: string;
	private _client_card: number;
	private _client_cv2: number;
	private _client_street: string;
	private _client_postal_code: string;
	private _client_city: string;
	private _products: ProductPurchase[];

	constructor(
			client_name: string,
			client_email: string,
			client_card: number,
			client_cv2: number,
			client_street: string,
			client_postal_code: string,
			client_city ) {
		
		this._client_name = client_name;
		this._client_email = client_email;
		this._client_card = client_card;
		this._client_cv2 = client_cv2;
		this._client_street = client_street;
		this._client_postal_code = client_postal_code;
		this._client_city = client_city;
	}

	public get clientName(): string {
		return this._client_name;
	}
	public set clientName(client_name: string) {
		this._client_name = client_name;
	}

	public get clientEmail(): string {
		return this._client_email;
	}
	public set clientEmail(client_email: string) {
		this._client_email = client_email;
	}

	public get clientCard(): number {
		return this._client_card;
	}
	public set clientCard(client_card: number) {
		this._client_card = client_card;
	}

	public get clientCV2(): number {
		return this._client_cv2;
	}
	public set clientCV2(client_cv2: number) {
		this._client_cv2 = client_cv2;
	}

	public get clientStreet(): string {
		return this._client_street;
	}
	public set clientStreet(client_street: string) {
		this._client_street = client_street;
	}

	public get clientPostalCode(): string {
		return this._client_postal_code;
	}
	public set clientPostalCode(client_postal_code: string) {
		this._client_postal_code = client_postal_code;
	}

	public get clientCity(): string {
		return this._client_city;
	}
	public set clientCity(client_city: string) {
		this._client_city = client_city;
	}

	public get products(): ProductPurchase[] {
		return this._products;
	}
	public set products(products: ProductPurchase[]) {
		this._products = products;
	}
	
}