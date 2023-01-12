
import axios from 'axios';
import { useEffect, useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import Swal from 'sweetalert2';

const URL = 'https://pwa-backmongo-production-8f1c.up.railway.app/productos/';

const ProductAdmin = () => {


    
    const [token, setToken] = useState('');
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const searchProduct = (e) => {
        setSearch(e.target.value);
    }

    const resultados = !search ? products : products.filter(product => product.nombre.toLowerCase().includes(search.toLowerCase()));

    useEffect(() => {
        const token = document.cookie.split('=')[1];
        setToken(token);
        if (!token) {
            navigate('/login')
        }
        else {
            getProducts();
        }
    }, [navigate])

    const logout = () => {
        document.cookie = 'token=; max-age=0; path=/; samesite=strict;';
        navigate('/login');
        
    }
    
    const getProducts = async () => {
        const response = await axios.get(URL);
        setProducts(response.data);
    }

    const deleteProduct = async (id) => {
        await axios.delete(URL + id);
        getProducts();
        Swal.fire('Producto eliminado con exito');
    }

    
        return (
            <div className='bg-light' style={{ minHeight: '100vh' }}>
                <header className="navbar navbar-dark  bg-dark flex-md-nowrap p-0 shadow ">
                    <Link to='/admin' className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-warning"  >Libre Market</Link>
                    <Link to='/admin' className='btn mt-2 mb-2 text-bg-warning'>Clientes</Link>
                    <Link to='/admin/productos/' className='btn mt-2 mb-2 text-bg-warning'>Products</Link>
                    <div className="navbar-nav">
                        <div className="nav-item text-nowrap bg-danger ">
                            <button className="btn btn-danger" onClick={logout}>Logout</button>
                        </div>
                    </div>
                </header>

                <div className='container'>
                    <Link to='/create' className='btn btn-primary mt-2 mb-2'><i className="fa-solid fa-plus"></i></Link>
                    <input className='form-control mt-3 mb-3' type="text" placeholder="Buscar Productos" onChange={searchProduct} />
                    <div className='table-responsive border rounded'> 
                        <MDBTable align='middle' className='table table-responsive  '>
                        <MDBTableHead className='table-primary'>
                            <tr>
                                {/* <th scope='col'>ID</th> */}
                                <th scope='col'>Name</th>
                                <th scope='col'>Precio</th>
                                <th scope='col'>Descripcion</th>
                                <th scope='col'>Actions</th>
                            </tr>
                        </MDBTableHead>
                            {resultados.map((product, index) => (
                                <MDBTableBody key={index}>
                                    <tr>
                                        <td>
                                            <div className='d-flex align-items-center'>
                                                <img
                                                    src={product.img}
                                                    alt=''
                                                    style={{ width: '45px', height: '45px' }}
                                                    className='rounded-circle'
                                                />
                                            <div className='ms-3'>
                                                <p className='mb-0'>{product.nombre.substring(0, 10)}</p>
                                            </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p className='mb-0'>$ {product.precio}</p>
                                        </td>
                                        <td>
                                            <p className='mb-0'>{product.descripcion.substring(0, 100)}...</p>
                                        </td>
                                        <td>
                                            <button 
                                            className="btn btn-danger" 
                                            onClick={() => deleteProduct(product._id)}><i className="fa-solid fa-trash-can"></i>
                                            </button>
                                            <Link to={'/edit/' + product._id} className='btn btn-info m-1'><i className="fa-solid fa-pencil"></i></Link>
                                        </td>
                                    </tr>
                                </MDBTableBody>
                            ))}
                        </MDBTable>
                    </div>
                </div>
            </div>
        )
}

export default ProductAdmin;
                            









