
import {  Routes, Route , HashRouter } from 'react-router-dom';
import './App.css';
import { useState } from 'react';

//importamos componentes
import CompShowProduct from './pages/ShowProduct';
import CompCreateProduct from './pages/CreateProduct';
import CompEditProduct from './pages/EditProduct';
import CompCreateClient from './pages/CreateLogin';
import CompEditClient from './pages/EditLogin';
import NavBar from './components/NavBar';
import ClientLogeado from './pages/Login';
import AdminClient from './pages/Admin';
import AdminProduct from './pages/ProductAdmin';
import Cart from './components/cart';
import Products from './pages/Products';
import  Nosotros  from './pages/Nosotros';
import Error from './pages/Error';
import Footer from './components/Footer';



function App() {

  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);


  return (
    <div className="App">

      <HashRouter>
      <NavBar 
        allProducts={allProducts}
        setAllProducts={setAllProducts}
        total={total}
        setTotal={setTotal}
        countProducts={countProducts}
        setCountProducts={setCountProducts}
        />
        <Routes>
          <Route path="*" element={<Error />}/>
          <Route path='/' element={<CompShowProduct
            allProducts={allProducts}
            setAllProducts={setAllProducts}
            total={total}
            setTotal={setTotal}
            countProducts={countProducts}
            setCountProducts={setCountProducts}

          />}  />
          <Route path='cart' element={<Cart 
            allProducts={allProducts}
            setAllProducts={setAllProducts}
            total={total}
            setTotal={setTotal}
            countProducts={countProducts}
            setCountProducts={setCountProducts}
          />}  />

          <Route path='/producto/:id' element={<Products />}  />
          <Route path='/nosotros' element={<Nosotros />}  />
          <Route path='/admin' element={<AdminClient />}  />
          <Route path='/admin/clientes' element={<AdminClient />}  />
          <Route path='/admin/productos' element={<AdminProduct />}  />
          <Route path='/create' element={<CompCreateProduct />}  />
          <Route path='/edit/:id' element={<CompEditProduct />}  />
          <Route path='/login' element={<ClientLogeado />}  />
          <Route path= '/clientes/create' element={<CompCreateClient />}  />
          <Route path= '/clientes/edit/:id' element={<CompEditClient />}  />
        </Routes>
        <Footer />
      </HashRouter>
        
        
      
    </div>
  );
}


export default App;
