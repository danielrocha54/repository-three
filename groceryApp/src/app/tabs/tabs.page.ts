import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { LoadingController } from '@ionic/angular';

import * as fromStore from '../../store/index';
import * as appActions from '../../store/actions/data.actions';

@Component({
	selector: 'app-tabs',
	templateUrl: 'tabs.page.html',
	styleUrls: ['tabs.page.scss']
})
export class TabsPage {
	
	constructor(private _store: Store<fromStore.AppState>,
				private _loadingController: LoadingController,
				private _router: Router) { }

	goToFstPage() {

		var self = this;

		self.presentSpineer();
		self._store.dispatch(new appActions.LoadData());
	}

	async presentSpineer() {

		const loading = await this._loadingController.create({
			message: 'loading cart...'
		});

		await loading.present();
	}

}
