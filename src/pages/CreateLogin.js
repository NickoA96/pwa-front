import axios from 'axios';
import {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const URL = 'https://pwa-backmongo-production-8f1c.up.railway.app/clientes/';

const CompCreateClient = () => {

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const guardar = async (e) => {
        e.preventDefault();
        const client = {
            nombre,
            email,
            password
        }
    if (nombre === '' || email === ''  || password === '') {
    Swal.fire('Todos los campos son obligatorios');
    return;
    }
        const res = (await axios.get(URL)).data;
        const existe = res.find((c) => c.email === email);
        if (existe) {
            Swal.fire('El email ya se encuentra registrado');
            return;
        }

        const newNombre = nombre.toLowerCase().trim();
        const newEmail = email.toLowerCase().trim();
        const newPassword = password.toLowerCase().trim();
        client.nombre = newNombre;
        client.email = newEmail;
        client.password = newPassword;
        

        await axios.post(URL, client);
        Swal.fire('Cliente creado con exito');
        navigate('/login');
    }

    return (
        <div className='bg-light' style={{ minHeight: '100vh' }}>
            <div className="container ">
                <div className=' p-3 d-flex align-items-center justify-content-center'>
                    <p className="maquina-escribir">Libre Market 😎 <span className="cursor">|</span></p>
                </div>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card mt-5">
                            <div className="card-header">
                                <h3>Create una Cuenta</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={guardar}>
                                <div className='form-group'>
                                    <label>Nombre <span className='text-danger'> * </span> </label>
                                    <input type='text' className='form-control' value={nombre} onChange={(e) => setNombre(e.target.value)} />

                                    <label>Email <span className='text-danger'> * </span> </label>
                                    <input type='email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
                            
                                    <label >Password <span className='text-danger'> * </span></label>
                                    <input type='password' className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <button type='submit' className='btn btn-success mt-2' >Validar</button>
                                <h6 className='text-start '><span className='text-danger '> * </span>Datos obligatorios </h6>
                            </form>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompCreateClient;
