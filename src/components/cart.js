import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";


const URL ="https://pwa-backmongo-production-8f1c.up.railway.app/productos/"

const Cart = ({total, setTotal, allProducts, setAllProducts,countProducts, setCountProducts}) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    //obtener productos de la base de datos
    const getProducts = async () => {
        const res = await axios.get(URL);
        setProducts(res.data);
    };
    

    const clearCart = () => {
        setAllProducts([]);
        setCountProducts(0);
        setTotal(0);
    }

    //en la tabla mostrar solo los productos fueron agregados al carrito y si se repiten sumar la cantidad
    const resultados = products.filter(product => allProducts.some(item => item._id === product._id));

    
    //valor total del carrito
    useEffect(() => {
        let total = 0;
        allProducts.forEach((product) => {
            total += product.precio * product.cantidad;
        });
        setTotal(total);
    }, [allProducts, setTotal]);
    
    const cantidad = allProducts.filter(product => allProducts.some(item => item._id === product._id));

    // que se actualice el contador de productos al modificar la cantidad
    useEffect(() => {
        let count = 0;
        allProducts.forEach((product) => {
            count += product.cantidad;
        });
        setCountProducts(count);
    }, [allProducts, setCountProducts]);



    return (
        <div className='bg-light' style={{ minHeight: '100vh' }}>
            <div className="container">
                <div className=' p-3 d-flex align-items-center justify-content-center'>
                    <p className="maquina-escribir">Libre Market 😎 <span className="cursor">|</span></p>
                </div>
                <div className="row">
                        <div className="card mt-5 ">
                            <div className="table-responsive">
                                <h3 className="">Carrito de Productos</h3>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Productos</th>
                                            <th>Cantidad</th>
                                            <th>Precio</th>
                                            <th>Subtotal</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {resultados.map ((product, index) => (
                                            <tr key={index}>
                                                <td>
                                                <img
                                                    src={product.img}
                                                    alt=''
                                                    style={{ width: '45px', height: '45px' }}
                                                    className='rounded-circle'
                                                />
                                                    {product.nombre}
                                                </td>
                                                <td>
                                                    <select className="form-select" aria-label="" value={cantidad[index].cantidad} onChange={(e) => {
                                                        allProducts[index].cantidad = parseInt(e.target.value);
                                                        setAllProducts([...allProducts]);
                                                    }}>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                        <option value="6">6</option>
                                                        <option value="7">7</option>
                                                        <option value="8">8</option>
                                                        <option value="9">9</option>
                                                        <option value="10">10</option>
                                                        <option value="11">11</option>
                                                        <option value="12">12</option>
                                                        <option value="13">13</option>
                                                        <option value="14">14</option>
                                                        <option value="15">15</option>
                                                        <option value="16">16</option>
                                                        <option value="17">17</option>
                                                        <option value="18">18</option>
                                                        <option value="19">19</option>
                                                        <option value="20">20</option>
                                                        <option value="21">21</option>
                                                        <option value="22">22</option>

                                                    </select>
                                                </td>
                                                <td>
                                                    ${product.precio}
                                                </td>
                                                <td>
                                                    ${product.precio * cantidad[index].cantidad}
                                                </td>
                                                <td>
                                                    <button className="btn btn-danger" onClick={() => {
                                                        allProducts.splice(index, 1);
                                                        setAllProducts([...allProducts]);
                                                        setCountProducts(countProducts - 1);
                                                    }}><i className="fa-solid fa-trash-can"></i></button>
                                                </td>
                                            </tr>

                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="card-body">
                                <hr/>
                                <h3 className="">Total</h3>
                                <h4 className="card-text">${total}</h4>
                                <button className="btn btn-danger" onClick={clearCart}>Vaciar Carrito</button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
    )
}

export default Cart;
