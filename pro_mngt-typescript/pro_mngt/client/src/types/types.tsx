export type RegisterFormInputs = {
    username: string;
    email: string;
    password: string;
}

export type LoginFormInputs = {
    email: string;
    password: string;  
}

export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    category: string;
}

export type ProductFormProps = {
    mfg_date: string,
    exp_date: string
} & Product