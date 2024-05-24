import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { deleteProduct, fetchProduct } from "../../../redux/product/action";
import { toast } from 'react-toastify';
import { Product } from "../../../types/types";
import { AppDispatch } from '../../../redux/store'

const useProductManagement = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const products:Product[] = useSelector((state: any) => state.product.products);

    useEffect(() => {
        dispatch(fetchProduct());
    }, [dispatch]);

    const handleUpdate = useCallback((id: string, product: Product) => {
        navigate(`/products/${id}`, { state: { product } });
    }, [navigate]);

    const handleDelete = useCallback((id: string) => {
        dispatch(deleteProduct(id))
        toast.success('Product deleted successfully');
    }, [dispatch]);

    return { products, handleUpdate, handleDelete };
};

export default useProductManagement;
