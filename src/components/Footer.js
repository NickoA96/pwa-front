import React from 'react';
import {
  MDBFooter,
} from 'mdb-react-ui-kit';

const Footer = () => {

    const año = new Date().getFullYear();

  return (
    <div>
      <MDBFooter className=' text-center' color='white' bgColor='dark'>

        <div className='text-center p-3 fw-bold' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
            © {año}  Libre Market by Nicolas Albornoz - Todos los derechos reservados
        </div>
        
        <div className ="d-flex justify-content-end" >
        <a href="https://github.com/NickoA96" className='mt-0 mb-0 m-2'><i className="fa-brands fa-github"></i></a>
        <a href="https://www.facebook.com/" className='mt-0 mb-0 m-2'><i className="fa-brands fa-facebook"></i></a>
        <a href="https://www.instagram.com/" className='mt-0 mb-0 m-2' ><i className="fa-brands fa-instagram"></i></a>
        <a href="https://www.twitter.com/" className='mt-0 mb-0 m-2'><i className="fa-brands fa-twitter"></i></a>
        <a href="https://www.youtube.com/" className='mt-0 mb-0 m-2'><i className="fa-brands fa-youtube"></i></a>
        <a href="https://www.whatsapp.com/" className='mt-0 mb-0 m-2'><i className="fa-brands fa-whatsapp"></i></a>
        <a href="https://www.telegram.com/" className='mt-0 mb-0 m-2'><i className="fa-brands fa-telegram"></i></a>
        <a href="https://www.twitch.com/" className='mt-0 mb-0 m-2'><i className="fa-brands fa-twitch"></i></a>
        
        </div>
      </MDBFooter>

    </div>
  )
}

export default Footer