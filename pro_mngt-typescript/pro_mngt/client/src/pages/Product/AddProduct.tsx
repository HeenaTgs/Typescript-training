import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Typography, Button, TextField, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from "react-redux";
import { addProduct, updateProduct } from "../../redux/product/action";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { ProductFormProps } from '../../types/types';
import { AppDispatch } from '../../redux/store'

const AddProduct: React.FC = () => {
    const { id } = useParams();
    const location = useLocation();
    const history = useNavigate();

    // If id is present, it's an update, otherwise it's an add
    const isUpdate = !!id;
    const product = location.state && location.state.product;

    const defaultTheme = createTheme();
    const { register, formState: { errors }, handleSubmit, reset } = useForm<ProductFormProps>();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (id && product) {
            reset(product);
        }
    }, [id, product, reset]);

    const onSubmit: SubmitHandler<ProductFormProps> = (data) => {
        if (isUpdate) {
            dispatch(updateProduct(id, data));
            history('/products');
        } else {
            dispatch(addProduct(data));
            history('/products');
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container maxWidth="sm">
                <Box textAlign="center" my={8}>
                    <Typography variant="h4" component="h1">
                        {isUpdate ? 'Update Product' : 'Add Product'}
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', marginTop: '1rem' }}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="name"
                            label="Name"
                            {...register("name", { required: true })}
                            error={!!errors.name}
                            helperText={errors.name && "Product name is required"}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="description"
                            label="Description"
                            {...register("description", { required: true })}
                            error={!!errors.description}
                            helperText={errors.description && "Description is required"}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="price"
                            label="Price"
                            type="number"
                            {...register("price", { required: true })}
                            error={!!errors.price}
                            helperText={errors.price && "Price is required"}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="quantity"
                            label="Quantity"
                            type="number"
                            {...register("quantity", { required: true })}
                            error={!!errors.quantity}
                            helperText={errors.quantity && "Quantity is required"}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="category"
                            label="Category"
                            {...register("category", { required: true })}
                            error={!!errors.category}
                            helperText={errors.category && "Category is required"}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="mfg_date"
                            label="Manufacturing Date"
                            type="text"
                            {...register("mfg_date", { required: true })}
                            error={!!errors.mfg_date}
                            helperText={errors.mfg_date && "Manufacturing Date is required"}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="exp_date"
                            label="Expiry Date"
                            type="text"
                            {...register("exp_date", { required: true })}
                            error={!!errors.exp_date}
                            helperText={errors.exp_date && "Expiry Date is required"}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3 }}
                        >
                            {isUpdate ? 'Update Product' : 'Add Product'}
                        </Button>
                    </form>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default AddProduct;
