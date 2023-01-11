import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';


const URL = 'https://pwa-backmongo-production-8f1c.up.railway.app/clientes/';

const CompEditLogin = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const update = async (e) => {
        e.preventDefault();
        const client = {
            nombre,
            email,
            password,
        }

        if (nombre === '' || email === ''  || password === '') {
            Swal.fire('Todos los campos son obligatorios');
            return;
        }
        // si el email es igual al email  pero el id es diferente entonces no se valida
        const response = await axios.get(URL);
        const clientes = response.data;
        const cliente = clientes.find(cliente => cliente.email === email && cliente._id !== id);
        if (cliente) {
            Swal.fire('El email ya se encuentra registrado en otro cliente');
            return;
        }

        const newNombre = nombre.toLowerCase().trim();
        const newEmail = email.toLowerCase().trim();
        const newPassword = password.toLowerCase().trim();
        client.nombre = newNombre;
        client.email = newEmail;
        client.password = newPassword;
        
        await axios.put(URL + id, client);
        Swal.fire('Cliente actualizado con exito');
        navigate('/admin');
    }
    const getClienteById = async () => {
        const response = await axios.get(URL + id);
        setNombre(response.data.nombre);
        setEmail(response.data.email);
        setPassword(response.data.password);
    }
    
    useEffect(() => {
        const token = document.cookie.split('=')[1];
        setToken(token);
        if (!token) {
            navigate('/login')
        }
        else { 
            axios.get(URL, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((res) => {
                // console.log(res);
            })
            .catch((err) => {
                // console.log(err);
                navigate('/login');
            })
        }
    }, [])
    
    useEffect(() => {
        getClienteById()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) 

    

    return (
        <div className='bg-light ' style={{ minHeight: '100vh' }} >
            <div className="container ">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card mt-5">
                            <div className="card-header">
                                <h3>Edit Cliente</h3>
                            </div>
                            <form onSubmit={update}>
                            <div className='form-group'>
                                <label>Nombre</label>
                                <input type='text' className='form-control' value={nombre} onChange={(e) => setNombre(e.target.value)} />

                                <label>Email</label>
                                <input type='email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />

                                <label>Password</label>
                                <input type='text' className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <button type='submit' className='btn btn-success mt-3 mb-3'><i className="fa-solid fa-check"></i>
                            </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompEditLogin;

