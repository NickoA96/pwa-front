import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';


const URL = 'https://pwa-backmongo-production-8f1c.up.railway.app/productos/';

const CompEditProduct = () => {
    const [nombre, setNombre] = useState('');
    const [img, setImg] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');

    const [token, setToken] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const update = async (e) => {
        e.preventDefault();
        const product = {
            nombre,
            img,
            descripcion,
            precio
        }
        if (nombre === '' || img === '' || descripcion === '' || precio === '') {
            Swal.fire('Todos los campos son obligatorios');
            return;
        }
        await axios.put(URL + id, product);
        Swal.fire('Producto actualizado con exito');
        navigate('/admin/productos');
    }

    const getProductById = async () => {
        const response = await axios.get(URL + id);
        setNombre(response.data.nombre);
        setImg(response.data.img);
        setDescripcion(response.data.descripcion);
        setPrecio(response.data.precio);
    }

    useEffect(() => {
        const token = document.cookie.split('=')[1];
        setToken(token);
        if (!token) {
            window.location.href = '/login';
        }
        else { 
            axios.get(URL, {
                headers: {
                    // 'Authorization': `Bearer ${token}`
                }
            })
            .then((res) => {
                // console.log(res);
            })
            .catch((err) => {
                // console.log(err);
                window.location.href = '/login';
            })
        }
    }, [])
    
    useEffect(() => {
        getProductById();
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='bg-light ' style={{ minHeight: '100vh' }} >
            <div className="container ">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card mt-5">
                            <div className="card-header">
                                <h3>Edit Product</h3>
                            </div>
                            <form onSubmit={update}>
                            <div className='form-group'>
                                <label>Nombre</label>
                                <input type='text' className='form-control' value={nombre} onChange={(e) => setNombre(e.target.value)} />

                                <label>Img</label>
                                <input type='text' className='form-control' value={img} onChange={(e) => setImg(e.target.value)} />

                                <label>Precio</label>
                                <input type='text' className='form-control' value={precio} onChange={(e) => setPrecio(e.target.value)} />

                                <label>Descripcion</label>
                                <textarea  type='text' className='form-control' value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
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

export default CompEditProduct;



