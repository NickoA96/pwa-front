
import {  useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const URL = 'https://pwa-backmongo-production-8f1c.up.railway.app/clientes/login';

const ClientLogeado = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = document.cookie.split('=')[1];
        if (token) {
            navigate('/admin');
        }
    }, [navigate])
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const client = {
            email,
            password
        }

    const validData = {
        email: email.length > 0,
        password: password.length > 0
    }
    // console.log(validData)
    
    if (validData.email && validData.password) {
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(client)
            })
            .then(res => res.json())
            .then((cred) => {
                document.cookie = `token=${cred.token}; max-age=${60*60}; path=/; samesite=strict;`;
                // console.log(document.cookie)
    })
    }

    const newEmail = email.toLowerCase().trim();
    const newPassword = password.toLowerCase().trim();
    client.email = newEmail;
    client.password = newPassword;
    
    await axios.post(URL, client)
        .then(res => {
            // console.log(res.data)
            if (res.data.message) {
                Swal.fire(res.data.message);
                return;
            }
            navigate('/admin');
        }
        )
    }
    

    return (
        <div className='bg-light ' style={{ minHeight: '100vh' }} >
            <div className="container ">
                <div className=' p-3 d-flex align-items-center justify-content-center'>
                <p className="maquina-escribir">Libre Market 😎 <span className="cursor">|</span></p>
                </div>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card mt-5">
                            <div className="card-header">
                                <h3>Ingresar a tu Cuenta</h3>
                            </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group  ">
                                    <label >Email <span className='text-danger'> * </span> </label>
                                    <input type="email" className="form-control"  name="email" id="email" placeholder='Ingres su email ' onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label >Password <span className='text-danger'> * </span> </label>
                                    <input type="password" className="form-control" name="password" id="password" placeholder='Ingrese su password' onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <button type="submit" className="btn btn-success m-2" >Ingresar</button>
                                <div className='bg-light border mt-2 mb-2'>
                                    <h5> No estas Registrado? Hacelo Ya!</h5>
                                    <Link to="/clientes/create" className=" mt-2  ">Registrate</Link>
                                </div>
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

export default ClientLogeado;