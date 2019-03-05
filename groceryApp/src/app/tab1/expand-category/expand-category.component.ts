import {
	Component,
	Input,
	Output,
	EventEmitter,
	ViewChild,
	ElementRef,
	Renderer,
	OnChanges,
	SimpleChanges
} from '@angular/core';

import { Product } from '../../model/product';


@Component({
	selector: 'app-expand-category',
	templateUrl: './expand-category.component.html',
	styleUrls: ['./expand-category.component.scss'],
})
export class ExpandCategoryComponent implements OnChanges {

	@ViewChild('expandWrapper', {read: ElementRef}) expandWrapper;

	@Input('products') products: Product[];
	@Input('category_id') id: number;
	@Input('category_name') name: string;
	@Input('expanded') expanded: boolean;

	@Output() toogleCategory: EventEmitter<number> = new EventEmitter();
	@Output() addProduct: EventEmitter<Product> = new EventEmitter();
	@Output() removeProduct: EventEmitter<Product> = new EventEmitter();

	constructor(public renderer: Renderer) {
	}

	emitToogleCategory() {
	
		this.toogleCategory.emit(this.id);
	}

	emitAddProduct(product: Product) {

		this.addProduct.emit(product);
	}

	emitRemoveProduct(product: Product) {

		this.removeProduct.emit(product);
	}

	ngOnChanges(changes: SimpleChanges) {
		
		if ( changes.expanded ) {

			if (this.expanded) {

				this.renderer.setElementStyle(
						this.expandWrapper.nativeElement,
						'height',
						(this.products.length * 45) + 'px'
					);
			} else {

				this.renderer.setElementStyle(
						this.expandWrapper.nativeElement,
						'height',
						'0px'
					);
			}

		}
	}

}
