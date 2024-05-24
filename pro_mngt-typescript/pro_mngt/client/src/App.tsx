import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import Product from './pages/Product/Product';
import AddProduct from './pages/Product/AddProduct';
import Login from './pages/Login';

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Product />} />
          <Route path="/products/:id" element={<AddProduct />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
