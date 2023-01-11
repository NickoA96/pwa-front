import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'




const NavBar = ({countProducts, setCountProducts}) => {
// que el contador de productos se actualice al agregar productos
    const [count, setCount] = useState(0);

    useEffect(() => {
        setCount(countProducts)
    }, [countProducts])

  return (
          <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
              <div className="container-fluid">
                <Link to='/' className='navbar-brand'>
                <img src="https://http2.mlstatic.com/storage/mshops-appearance-api/images/17/37097017/logo-2021010422471962300.png" alt="" width="50" height="40" className="d-inline-block align-text-top" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <Link to='/' className='nav-link'>Products</Link>
                    </li>
                    <li className="nav-item">
                      <Link to='/login' className='nav-link'>Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/clientes/create" className="nav-link">Registrate</Link>
                    </li>
                    <li className="nav-item">
                      <Link to='/nosotros' className='nav-link'>Nosotros</Link>
                    </li>
                  </ul>
                  <div className="">
                    <Link to='/cart' className='nav-link'>
                    <i className="fa-solid fa-cart-shopping"></i>
                    <span className="badge bg-danger rounded-pill">{count}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </nav>
          </div>
  )
}

export default NavBar


