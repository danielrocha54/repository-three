import { Action } from '@ngrx/store';

import { Cart } from '../../app/model/cart';
import { Product } from '../../app/model/product';
import { Purchase } from '../../app/model/purchase';

export enum AppDataActionTypes {
  LoadData = '[AppDataAction] Load Data',
  SetData = '[AppDataAction] Set Data',
  AddProductToCart = '[AppDataAction] Add Product To Cart',
  RemoveProductFromCart = '[AppDataAction] Remove Product From Cart',
  SubmitPurchase = '[AppDataAction] Submit Purchase',
  OperationSuccess = '[AppDataAction] Operation Success',
  OperationError = '[AppDataAction] Operation Error'
}

export class LoadData implements Action {

  readonly type = AppDataActionTypes.LoadData;
}

export class SetData implements Action {

  readonly type = AppDataActionTypes.SetData;
 
  constructor(public payload: Cart) {}
}

export class AddProductToCart implements Action {

  readonly type = AppDataActionTypes.AddProductToCart;
 
  constructor(public categoryId:  number, public product: Product) {}
}

export class RemoveProductFromCart implements Action {

  readonly type = AppDataActionTypes.RemoveProductFromCart;
 
  constructor(public categoryId:  number, public product: Product, public erase: boolean) {}
}

export class SubmitPurchase implements Action {

  readonly type = AppDataActionTypes.SubmitPurchase;
 
  constructor(public purchase: Purchase) {}
}


export class OperationSuccess implements Action {

  readonly type = AppDataActionTypes.OperationSuccess;
}

export class OperationError implements Action {

  readonly type = AppDataActionTypes.OperationError;
}

export type AppDataActions =
    LoadData
	|	SetData
  | AddProductToCart
  | RemoveProductFromCart
  | SubmitPurchase
  | OperationSuccess
  | OperationError
	;

