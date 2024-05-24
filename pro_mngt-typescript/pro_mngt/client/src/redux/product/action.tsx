import axiosInstance from '../../utils/interceptor';
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

const createAction = (type: string, payload?: any) => ({ type, payload });

// Fetch all products
export const fetchProduct = () => async (dispatch: Function) => {
  dispatch(createAction(FETCH_PRODUCT_REQUEST));
  try {
    const { data } = await axiosInstance.get('/products');
    dispatch(createAction(FETCH_PRODUCT_SUCCESS, data));
  } catch (error: any) {
    dispatch(createAction(FETCH_PRODUCT_FAILURE, error.response?.data?.message || error.message));
  }
};

// Add new product
export const addProduct = (productData: any) => async (dispatch: Function) => {
  dispatch(createAction(FETCH_PRODUCT_ADD_REQUEST));
  try {
    const { data } = await axiosInstance.post('/products', productData);
    dispatch(createAction(FETCH_PRODUCT_ADD_SUCCESS, data));
  } catch (error: any) {
    dispatch(createAction(FETCH_PRODUCT_ADD_FAILURE, error.message));
  }
};

// Update product
export const updateProduct = (id: string, productData: any) => async (dispatch: Function) => {
  dispatch(createAction(FETCH_PRODUCT_UPDATE_REQUEST));
  try {
    const { data } = await axiosInstance.put(`/products/${id}`, productData);
    dispatch(createAction(FETCH_PRODUCT_UPDATE_SUCCESS, data));
  } catch (error: any) {
    dispatch(createAction(FETCH_PRODUCT_UPDATE_FAILURE, error.response?.data?.message || error.message));
  }
};

// Delete product
export const deleteProduct = (id: string) => async (dispatch: Function) => {
  dispatch(createAction(FETCH_PRODUCT_DELETE_REQUEST));
  try {
    await axiosInstance.delete(`/products/${id}`);
    dispatch(createAction(FETCH_PRODUCT_DELETE_SUCCESS, id));
  } catch (error:any) {
    dispatch(createAction(FETCH_PRODUCT_DELETE_FAILURE, error.response?.data?.message || error.message));
  }
};
