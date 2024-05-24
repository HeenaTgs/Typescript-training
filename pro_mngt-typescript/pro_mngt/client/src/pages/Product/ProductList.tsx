import React, { useMemo } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import useProductManagement from "./customHook/useProductManagement";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Product } from '../../types/types';

const ProductList: React.FC = () => {
    const { products, handleUpdate, handleDelete } = useProductManagement();
    const memoizedProducts: Product[] = useMemo(() => products, [products]);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {memoizedProducts.map((product: Product, index: number) => (
                        <TableRow key={index}>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.description}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>{product.quantity}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="primary" onClick={() => handleUpdate(product.id, product)}>Update</Button>
                                &nbsp; 
                                <Button variant="contained" color="secondary" onClick={() => handleDelete(product.id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <ToastContainer />
        </TableContainer>
    );
};

export default ProductList;
