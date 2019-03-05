import * as appActions from '../actions/data.actions';
import { Cart } from '../../app/model/cart';
import { Product } from '../../app/model/product';

export interface State {
  cart: Cart,
  total: number,
  quantity: number,
  success: boolean,
  error: boolean
}

export const initialState: State = {
  cart: null,
  total: 0,
  quantity: 0,
  success: true,
  error: false
};

enum Operation {
  ADD,
  REMOVE
}

function updateCart(operation: Operation, cart: Cart, categoryId: number, product: Product, erase?: boolean): Cart {
  
  for ( let category of cart.categories ) {

    if ( category.id === categoryId ) {

      for ( let prod of category.products ) {

        if ( prod.id === product.id ) {

          prod.quantity = prod.quantity + ( (operation === Operation.ADD)? 1 : -1 );
          prod.erase = erase;

          return cart;

        }

      }

    }

  }

  return cart;

}

export function reducer(state = initialState, action: appActions.AppDataActions): State {

  let newState: State = null;

  switch (action.type) {

    case appActions.AppDataActionTypes.AddProductToCart:

      newState = {
          ...state,
          cart: updateCart(Operation.ADD, state.cart, action.categoryId, action.product),
          total: state.total + action.product.price,
          quantity: state.quantity + 1
        };
      break;

    case appActions.AppDataActionTypes.RemoveProductFromCart:

      newState = {
          ...state,
          cart: updateCart(Operation.REMOVE, state.cart, action.categoryId, action.product, action.erase),
          total: ((state.quantity - 1) === 0)? 0 : state.total - action.product.price,
          quantity: state.quantity - 1,

        };
      break;

    case appActions.AppDataActionTypes.SetData:

      newState = {
          ...state,
          cart: action.payload,
          total: 0,
          quantity: 0,
          success: true,
          error: false
        };
      break;

    case appActions.AppDataActionTypes.OperationSuccess:

      newState = {
          ...state,
          success: true,
          error: false
        };
      break;

    case appActions.AppDataActionTypes.OperationError:

      newState = {
          ...state,
          success: false,
          error: true
        };
      break;

    default:
      newState = state;
      break;

  }

  console.log("===================");
  console.log("==== NEW STATE ====");
  console.log(newState);

  return newState;

}