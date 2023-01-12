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

            if (response.data.nombre === undefined) {
                setNombre('Producto no encontrado');
                setImg('https://st2.depositphotos.com/1810600/7836/v/600/depositphotos_78369014-stock-illustration-yellow-sad-face.jpg');
                setDescripcion('');
                setPrecio('...');

            }
        })
        .catch(error => {
            // console.log(error);
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
                    {!nombre ? <div className="d-flex justify-content-center">
                        <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                        </div>
                </div> :
                <div className="row">
                    <div className="d-flex justify-content-center  align-content-center  ">
                        <div className="card mt-5 col-md-5  ">
                            <div className="card-header">
                                <h3 className="card-title text-center ">{nombre}</h3>
                            </div>
                            <img src={img} 
                            className="rounded-start card-img-top" 
                            style={{ maxHeight: "500px" , maxWidth: "500px" }}
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





