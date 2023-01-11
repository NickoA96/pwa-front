import axios from 'axios';
import { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';

const URL = 'https://pwa-backmongo-production-8f1c.up.railway.app/clientes/';

const AdminClient = () => {

    // comprobamos si hay un token en el navegador
    const [clientes, setClientes] = useState([]);
    const [token, setToken] = useState('');
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const searchClient = (e) => {
        setSearch(e.target.value);
    }

    const resultados = !search ? clientes : clientes.filter(cliente => cliente.email.toLowerCase().includes(search.toLowerCase()));

    useEffect(() => {
        const token = document.cookie.split('=')[1];
        setToken(token);
        if (!token) {
            navigate('/login');
        }else { 
            axios.get(URL, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    setClientes(res.data);
                })
        }
    }, [])

    const logout = () => {
        document.cookie = 'token=; max-age=0; path=/; samesite=strict;';
        navigate('/login');
        
    }

    const getClientes = async () => {
        const response = await axios.get(URL);
        setClientes(response.data);
    }

    const deleteCliente = async (id) => {
        await axios.delete(URL + id);
        getClientes();
        Swal.fire('Cliente eliminado con exito');
    }


    return (
        <div className='bg-light' style={{ minHeight: '100vh' }}>
            <div id="tabla" className='mb-0'>
                <header className="navbar navbar-dark  bg-dark flex-md-nowrap p-0 shadow  ">
                    <Link to='/admin' className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-warning"  >Libre Market</Link>
                    <Link to='/admin' className='btn mt-2 mb-2 text-bg-warning'>Clientes</Link>
                    <Link to='/admin/productos/' className='btn mt-2 mb-2 text-bg-warning'>Products</Link>
                    <div className="navbar-nav">
                        <div className="nav-item text-nowrap bg-danger  ">
                            <button className="btn btn-danger" onClick={logout}>Logout</button>
                        </div>
                    </div>
                </header>

            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <Link to='/clientes/create' className='btn btn-primary mt-2 mb-2'><i className="fa-solid fa-plus"></i></Link>
                        <input className='form-control mb-3 mt-3  ' type="text" placeholder="Buscar por Email" onChange={searchClient} />
                        <div className='table-responsive border rounded'> 
                            <table className='table table-responsive  '>
                                <thead className='table-primary'>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Email</th>
                                        <th>Password</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>        
                                <tbody>
                                    {resultados.map((cliente, index ) => (
                                        <tr key={index}>
                                            <td>{cliente._id}</td>
                                            <td>{cliente.nombre}</td>
                                            <td>{cliente.email}</td>
                                            <td>{cliente.password}</td>
                                            <td>
                                                <Link to={'/clientes/edit/' + cliente._id} className='btn btn-info m-1'><i className="fa-solid fa-pencil"></i></Link>
                                                <button className='btn btn-danger' onClick={() => deleteCliente(cliente._id)}><i className="fa-solid fa-trash-can"></i></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>    
                </div>
                </div>
            </div>
        </div>
    )
}

export default AdminClient;

