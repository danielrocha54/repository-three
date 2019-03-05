import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as appActions from '../../store/actions/data.actions';
import * as fromStore from '../../store/index';
import { Cart } from '../model/cart';
import { Product } from '../model/product';
import { Purchase, ProductPurchase } from '../model/purchase';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

	private cart$: Observable<Cart>;
	
	private clientFirstName: string;
	private clientLastName: string;
	private clientCardNumber: number;
	private clientCardCV2: number;
	private clientEmail: string;
	private clientStreet: string;
	private clientPostalCode: string;
	private clientCity: string;

	private purchaseForm : FormGroup;

	private submitted: boolean = false;

	constructor(private _loadingController: LoadingController,
				private _store: Store<fromStore.AppState>,
				private _router: Router) {}

	ngOnInit() {

		this.cart$ = this._store.pipe(select(fromStore.selectCart));

		this.purchaseForm = new FormGroup({
			clientFirstName: new FormControl('', [Validators.required, Validators.pattern('[A-Z][a-z]+')]),
			clientLastName: new FormControl('', [Validators.required, Validators.pattern('[A-Z][a-z]+')]),
			clientCardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
			clientCardCV2: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
			clientEmail: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9]+\@[a-zA-Z0-9]+\\.[a-z]+')]),
			clientStreet: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z ]+')]),
			clientPostalCode: new FormControl('', [Validators.required]),
			clientCity: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z ]+')])
		});
	}

	goToSndPage() {
		this._router.navigateByUrl('tab2');
	}

	onPurchase() {

		this.submitted = true;
		if ( this.purchaseForm.valid ) {
			let purchase: Purchase = new Purchase(	this.clientFirstName, this.clientLastName,
													this.clientCardNumber, this.clientCardCV2,
													this.clientStreet, this.clientPostalCode, this.clientCity );
			let cartSubscription: Subscription = this.cart$.subscribe(cart => purchase.products = cart.products);

			cartSubscription.unsubscribe();

			this.presentSpineer();
			this._store.dispatch(new appActions.SubmitPurchase(purchase));
		}
	}

	async presentSpineer() {

		const loading = await this._loadingController.create({
			message: 'submitting purchase...'
		});

		await loading.present();
	}

}
