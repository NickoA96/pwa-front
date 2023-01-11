
import error404 from '../assets/img/error404.jpg';
import { Link, useNavigate } from 'react-router-dom';


const Error = () => {
    const navigate = useNavigate();

    // redireccionar en 5 sg
    setTimeout(() => {
        navigate('/')
    }, 5000);

    return (
            <div className="container">
                <h6>
                    <Link  to="/" className=' fw-bold' >Retornar a Pagina Principal</Link>
                </h6>
                <section className="section m-5 text-center ">
                    <img src={error404} className="d-block w-100 mb-5" alt="Error 404" />
                </section>
            </div>
    );
}

export default Error;

