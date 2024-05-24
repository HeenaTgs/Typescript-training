import {
   FETCH_PRODUCT_FAILURE,
   FETCH_PRODUCT_REQUEST,
   FETCH_PRODUCT_SUCCESS,
   FETCH_PRODUCT_ADD_SUCCESS,
   FETCH_PRODUCT_ADD_FAILURE,
   FETCH_PRODUCT_ADD_REQUEST,
   FETCH_PRODUCT_UPDATE_REQUEST,
   FETCH_PRODUCT_UPDATE_SUCCESS,
   FETCH_PRODUCT_UPDATE_FAILURE,
   FETCH_PRODUCT_DELETE_REQUEST,
   FETCH_PRODUCT_DELETE_SUCCESS,
   FETCH_PRODUCT_DELETE_FAILURE,
} from './types';

interface Product {
   id: string;
   name: string;
   description: string;
   price: number;
   quantity: number;
   category: string;
   mfg_date: string;
   exp_date: string;
}

interface ProductsState {
   loading: boolean;
   products: Product[];
   error: string | null;
}

const INITIAL_STATE: ProductsState = {
   loading: false,
   products: [],
   error: null
};

const reducer = (state: ProductsState = INITIAL_STATE, action: any): ProductsState => {
   switch (action.type) {
      case FETCH_PRODUCT_REQUEST:
      case FETCH_PRODUCT_ADD_REQUEST:
      case FETCH_PRODUCT_UPDATE_REQUEST:
      case FETCH_PRODUCT_DELETE_REQUEST:
         return {
            ...state,
            loading: true,
         };

      case FETCH_PRODUCT_SUCCESS:
         return {
            ...state,
            loading: false,
            products: action.payload,
            error: null
         };

      case FETCH_PRODUCT_FAILURE:
      case FETCH_PRODUCT_ADD_FAILURE:
      case FETCH_PRODUCT_UPDATE_FAILURE:
      case FETCH_PRODUCT_DELETE_FAILURE:
         return {
            ...state,
            loading: false,
            error: action.payload
         };

      case FETCH_PRODUCT_ADD_SUCCESS:
         return {
            ...state,
            loading: false,
            products: [...state.products, action.payload],
            error: null
         };

      case FETCH_PRODUCT_UPDATE_SUCCESS:
         const updatedProducts = state.products.map(product =>
            product.id === action.payload.id ? action.payload : product
         );
         return {
            ...state,
            loading: false,
            products: updatedProducts,
            error: null
         };

      case FETCH_PRODUCT_DELETE_SUCCESS:
         const filteredProducts = state.products.filter(product =>
            product.id !== action.payload
         );
         return {
            ...state,
            loading: false,
            products: filteredProducts,
            error: null
         };

      default: 
         return state;
   }
};

export default reducer;
