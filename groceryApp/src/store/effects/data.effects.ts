import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subscription, of } from 'rxjs';
import { Store, Action, select } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { NavController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

import * as appActions from '../actions/data.actions';
import * as fromStore from '../../store/index';
import { Product } from '../../app/model/product';
import { Category } from '../../app/model/category';
import { Cart } from '../../app/model/cart';


@Injectable()
export class AppDataEffects {

constructor(private _actions$: Actions,
            private _http: HttpClient,
            private _store: Store<fromStore.AppState>,
            private _router: Router,
            private _loadingController: LoadingController) {}

async dismissSpineer() {
  return await this._loadingController.dismiss();
}

@Effect({ dispatch: false })
  submitPurchase$: Observable<Action> = this._actions$.pipe(
    ofType(appActions.AppDataActionTypes.SubmitPurchase),
    map((action) => action),
    switchMap(( payload ) => {

      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Access-Control-Allow-Headers','Content-Type,Authorization,Lang');;
      headers = headers.set('Access-Control-Allow-Headers','*');
      headers = headers.set('Access-Control-Allow-Methods','POST,GET,PUT,DELETE,OPTIONS');
      headers = headers.set('Access-Control-Allow-Origin', '*');

      return this._http.post<any>('http://localhost:8080/api/purchase', payload['purchase'] , { headers })
        .pipe(
          map((response) => {

            this.dismissSpineer();
            this._router.navigateByUrl('tab4');

            if (response.httpstatus == 200) {
              return new appActions.OperationSuccess();
            } else {
              return new appActions.OperationError();
            }

          }),
          catchError((error) => {

            this.dismissSpineer();
            this._router.navigateByUrl('tab4');

            this._store.dispatch(new appActions.OperationError());

            return of(
              new appActions.OperationError()
            );

          })
        );
    })
  );

@Effect()
  loadGroceries$: Observable<Action> = this._actions$.pipe(
    ofType(appActions.AppDataActionTypes.LoadData),
    map((action) => action),
    switchMap(( payload ) => {

      this._router.navigateByUrl('tab1');

      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      headers = headers.set('Access-Control-Allow-Headers','Content-Type,Authorization,Lang');;
      headers = headers.set('Access-Control-Allow-Headers','*');
      headers = headers.set('Access-Control-Allow-Methods','POST,GET,PUT,DELETE,OPTIONS');
      headers = headers.set('Access-Control-Allow-Origin', '*');

      return this._http.get<any>('http://localhost:8080/api/groceries', { headers })
        .pipe(
          map((response) => {

            var self = this;

            if (!response || !response.data || (response.httpstatus != 200)) {

              self.dismissSpineer();
              self._router.navigateByUrl('tab4');

              return new appActions.OperationError();

            } else {

              let cart: Cart = new Cart();
              let category: Category = new Category(response.data[0]['id'], response.data[0]['name']);

              response.data.sort( function(p1, p2){
                                    if ( p1['category_id'] < p2['category_id'] ) {
                                      return -1;
                                    } else if (p1['category_id'] > p2['category_id']) {
                                      return 1;
                                    }

                                    return 0;
                                  } 
              ).map( prod => {

                if ( prod['category']['id'] != category.id ) {
                  cart.setCategory(category);
                  category = new Category(prod['category']['id'], prod['category']['name']);
                }

                category.setProduct(new Product(prod['id'], prod['name'], prod['price']));

              });

              cart.setCategory(category);

              setTimeout(function () {
                self.dismissSpineer();
              }, 5000);

              return new appActions.SetData(cart);
            }

          }),
          catchError((error) => {

            var self = this;

            setTimeout(function () {
              self.dismissSpineer();
              self._router.navigateByUrl('tab4');
            }, 1000);

            this._store.dispatch(new appActions.OperationError());
            
            return of(
              new appActions.OperationError()
            );

          })
        );
    })
  );

}
