
import error404 from '../assets/img/error404.jpg';
import { Link } from 'react-router-dom';


const Error = () => {

    // redireccionar en 5 sg
    setTimeout(() => {
        window.location.href = '/';
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

