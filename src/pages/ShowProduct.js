
import axios from 'axios';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';


const URL = 'https://pwa-backmongo-production-8f1c.up.railway.app/productos/';

const CompShowProduct = ({allProducts, setAllProducts,countProducts, setCountProducts }) => {

    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);

    const searchProduct = (e) => {
        setSearch(e.target.value);
    }

    const resultados = !search ? products : products.filter(product => product.nombre.toLowerCase().includes(search.toLowerCase()));

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const response = await axios.get(URL);
        setProducts(response.data);
    }

    //que el contador de productos se actualice al agregar productos
    useEffect(() => {
        let count = 0;
        allProducts.forEach((product) => {
            count += product.cantidad;
        });
        setCountProducts(count);
    }, [allProducts, setCountProducts]);
    
    const onAddProduct = (product) => {
        if (allProducts.find((item) => item._id === product._id)) {
            const products = allProducts.map((item) => {
                if (item._id === product._id) {
                    item.cantidad += 1;
                }
                return item;
            });
            setAllProducts(products);
            setCountProducts(countProducts + 1);
        } else {
            setAllProducts([...allProducts, { ...product, cantidad: 1 }]);
            setCountProducts(countProducts + 1);
        }
    };
    
    return (
        //card 
        <div className='bg-light' style={{ minHeight: '100vh' }}>
            <div className='container '>
                <div className='section' >
                    <div className=' p-3 d-flex align-items-center justify-content-center'>
                        <p className="maquina-escribir">Libre Market 😎 <span className="cursor">|</span></p>
                    </div>
                    <div>
                        <input className='form-control mt-4'
                        type="text" 
                        placeholder="Buscar Productos"
                        onChange={searchProduct} 
                        />
                        <div className='row  row-cols-1 row-cols-md-3 mt-0 '>
                            {resultados.map((product, index) => (
                                <div className="col" key={index} >
                                    <section className="container d-flex align-content-center justify-content-center">
                                        <div className="card mt-3 mb-3 col-md-12 col-9 "  >
                                            <div className='rounded-start card-img-top' style={{maxHeight: "350px", maxWidth: "390px" }} >
                                                <img src={product.img} alt="" className=' card-img-top'   />
                                            </div>
                                            <div className="card-body bg-light">
                                                <h5 className='card-title'>{product.nombre.substring(0, 21)}</h5>
                                                <p className='card-text' >{product.descripcion.substring(0, 100)}</p>
                                                <h5 className='card-text mb-3'>${product.precio.substring(0, 13)}</h5>
                                                <Link to={`producto/${product._id}`} className='btn btn-primary m-2 mb-1 mt-0'>More +</Link>
                                                <button className='btn btn-success m-2 mb-0 mt-0' onClick={() => onAddProduct(product)}>Add to Cart</button>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompShowProduct;

                            






