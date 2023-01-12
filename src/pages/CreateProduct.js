import axios from 'axios';
import {  useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { uploadFile } from '../firebase/config';


const URL = 'https://pwa-backmongo-production-8f1c.up.railway.app/productos/';

const CompCreateProduct = () => {

    const [nombre, setNombre] = useState('');
    const [file, setFile] = useState(null);
    const [precio, setPrecio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [cantidad, setCantidad] = useState('');

    // const navigate = useNavigate();

    const guardar = async (e) => {
        e.preventDefault();
        if (nombre === '' || precio === '' || descripcion === '' || cantidad === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todos los campos son obligatorios',
            })
            return;
        }
        if (file === null) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'La imagen es obligatoria',
            })
            return;
        }

        const url = await uploadFile(file);
        // console.log(url);
        const producto = {
            nombre,
            img: url,
            descripcion,
            precio,
            cantidad
        }
        // console.log(producto);

        try {
            await axios.post(URL, producto);
            // console.log(res);
            Swal.fire({
                icon: 'success',
                title: 'Producto creado',
                showConfirmButton: false,
                timer: 1500
            })
            // navigate('/productos');
        } catch (error) {
            // console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ocurrio un error',
            })
        }
    }


    return (
        <div className='bg-light' style={{ minHeight: '100vh' }}>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <h1>Create Product</h1>
                        <form  onSubmit={guardar}>
                            <div className='form-group'>
                                <label>Nombre</label>
                                <input type='text' className='form-control' value={nombre} onChange={(e) => setNombre(e.target.value)} />

                                <label>Imagen</label>
                                <input type='file' className='form-control' onChange={(e) => setFile(e.target.files[0])} />

                                <label>Precio</label>
                                <input type='text' className='form-control' value={precio} onChange={(e) => setPrecio(e.target.value)} />

                                <label>Descripcion</label>
                                <textarea  type='text' className='form-control' value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />

                                <label>Cantidad</label>
                                <input type='number' className='form-control' value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
                            </div>
                            <button type='submit' className='btn btn-primary'><i className="fa-solid fa-check"></i></button>
                        </form>
                    </div>
                </div>    
            </div>
        </div>
    )
}

export default CompCreateProduct;
