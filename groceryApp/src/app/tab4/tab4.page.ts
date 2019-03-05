import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import * as fromStore from '../../store/index';
import * as appActions from '../../store/actions/data.actions';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page implements OnInit {

	private success$: Observable<boolean>;
	private error$: Observable<boolean>;
	
	constructor(private _store: Store<fromStore.AppState>,
				private _router: Router) { }

	ngOnInit() {
		this.success$ = this._store.pipe(select(fromStore.selectSuccess));
		this.error$ = this._store.pipe(select(fromStore.selectError));
	}

	goToHomePage() {

		this._store.dispatch(new appActions.OperationSuccess());
		this._router.navigateByUrl('home');
	}

}
