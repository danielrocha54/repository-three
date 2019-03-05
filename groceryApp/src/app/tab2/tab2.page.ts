import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';

import * as fromStore from '../../store/index';
import * as appActions from '../../store/actions/data.actions';
import { Cart } from '../model/cart';
import { Product } from '../model/product';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

	private cart$: Observable<Cart>;
	private total$: Observable<number>;
	private quantity$: Observable<number>;

	
	constructor(private _store: Store<fromStore.AppState>,
				private _router: Router) { }

	ngOnInit() {

		this.cart$ = this._store.pipe(select(fromStore.selectCart));
		this.total$ = this._store.pipe(select(fromStore.selectTotal));
		this.quantity$ = this._store.pipe(select(fromStore.selectQuantity));
	}

	goToFstPage() {
		this._router.navigateByUrl('tab1');
	}

	goToTrdPage() {
		this._router.navigateByUrl('tab3');
	}

	public addProductToCart(categoryId: number, product: Product) {

		this._store.dispatch(new appActions.AddProductToCart(categoryId, product));
	}

	public removeProductFromCart(categoryId: number, product: Product) {

		this._store.dispatch(new appActions.RemoveProductFromCart(categoryId, product, false));
	}


}
