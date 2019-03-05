import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';

import * as fromStore from '../../store/index';
import * as appActions from '../../store/actions/data.actions';
import { Cart } from '../model/cart';
import { Product } from '../model/product';


@Component({
	selector: 'app-tab1',
	templateUrl: 'tab1.page.html',
	styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

	private cart$: Observable<Cart>;
	private total$: Observable<number>;
	private quantity$: Observable<number>;

	private expandedCategories: number[];

	constructor(private _store: Store<fromStore.AppState>,
				private _router: Router) {

		this.expandedCategories = [];
	}

	ngOnInit() {

		this.cart$ = this._store.pipe(select(fromStore.selectCart));
		this.total$ = this._store.pipe(select(fromStore.selectTotal));
		this.quantity$ = this._store.pipe(select(fromStore.selectQuantity));
	}

	goToSndPage() {
		this._router.navigateByUrl('tab2');
	}

	public toogleExpandCategory(categoryId: number) {
		
		let index = this.expandedCategories.indexOf(categoryId);
		
		if (index >= 0) {
			this.expandedCategories.splice(index, 1);
		} else {
			this.expandedCategories.push(categoryId);
		}
	}

	public addProductToCart(categoryId: number, product: Product) {

		this._store.dispatch(new appActions.AddProductToCart(categoryId, product));
	}

	public removeProductFromCart(categoryId: number, product: Product) {

		this._store.dispatch(new appActions.RemoveProductFromCart(categoryId, product, true));
	}	

	public isExpandedCategory(categoryId: number) {

		return this.expandedCategories.indexOf(categoryId) >= 0;
	}

}
