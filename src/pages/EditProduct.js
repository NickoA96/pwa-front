import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { uploadFile } from '../firebase/config';



const URL = 'https://pwa-backmongo-production-8f1c.up.railway.app/productos/';

const CompEditProduct = () => {
    const [nombre, setNombre] = useState('');
    const [file, setFile] = useState(null);
    const [img, setImg] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [token, setToken] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();




    const update = async (e) => {
        e.preventDefault();
        if (nombre === '' || precio === '' || descripcion === '' || cantidad === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todos los campos son obligatorios',
            })
            return;
        }
        
        // en caso de que no se haya seleccionado una imagen nueva se mantiene la que ya tenia el producto 
        let imgURL = img;
        if (file) {
            imgURL = await uploadFile(file);
        }
        const producto = {
            nombre,
            img: imgURL,
            descripcion,
            precio,
            cantidad
        }


        try {
            await axios.put(URL + id , producto);
            // console.log(res);
            Swal.fire({
                icon: 'success',
                title: 'Producto editado',
                showConfirmButton: false,
                timer: 1500
            })
            navigate('/admin/productos');
        } catch (error) {
            // console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ocurrio un error',
            })
        }
    }

    const getProductById = async () => {
        const response = await axios.get(URL + id);
        setNombre(response.data.nombre);
        setImg(response.data.img);
        setDescripcion(response.data.descripcion);
        setPrecio(response.data.precio);
        setCantidad(response.data.cantidad);
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
                navigate('/login')
            })
        }
    }, [navigate])
    
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

                                <div>
                                <label>Imagen</label>
                                <br />
                                <img src={img} alt={nombre} width='100' />
                                <input type='file' className='form-control' onChange={(e) => setFile(e.target.files[0])} />
                                </div>

                                <label>Precio</label>
                                <input type='text' className='form-control' value={precio} onChange={(e) => setPrecio(e.target.value)} />

                                <label>Descripcion</label>
                                <textarea  type='text' className='form-control' value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />

                                <label>Cantidad</label>
                                <input type='number' className='form-control' value={cantidad} onChange={(e) => setCantidad(e.target.value)} />

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




