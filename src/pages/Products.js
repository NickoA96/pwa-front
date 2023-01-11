import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';



const URL = 'https://pwa-backmongo-production-8f1c.up.railway.app/productos/';

const Products = () => {
    const [nombre, setNombre] = useState('');
    const [img, setImg] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const { id } = useParams();

    const getProductById = async () => {
        await axios.get(URL + id)
        .then(response => {
            
            setNombre(response.data.nombre);
            setImg(response.data.img);
            setDescripcion(response.data.descripcion);
            setPrecio(response.data.precio);
        })
        .catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        getProductById();
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div className='bg-light' style={{ minHeight: '100vh' }}>
            <section className="container ">
                <div className=' p-3 d-flex align-items-center justify-content-center'>
                    <p className="maquina-escribir">Libre Market 😎 <span className="cursor">|</span></p>
                </div>
                {nombre === '' || img === '' || descripcion === '' || precio === '' ? <h3 className="card-title text-center ">Producto no encontrado</h3> : 
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card mt-5  ">
                            <div className="card-header">
                                <h3 className="card-title text-center ">{nombre}</h3>
                            </div>
                            <img src={img} 
                            className="rounded-start card-img-top" 
                            style={{ maxHeight: "500px" }}
                            alt={nombre}
                            />
                            <div className="card-body bg-light">
                                <h6 className="card-text">{descripcion}</h6>
                                <h6 className="card-text"> $ {precio}</h6>
                                <Link to='/' className='btn btn-primary'>Volver</Link>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </section>
        </div>
    )
}

export default Products;



