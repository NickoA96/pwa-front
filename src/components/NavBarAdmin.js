
import React from 'react'

export const NavBarAdmin = () => {

    const logout = () => {
        document.cookie = 'token=; max-age=0; path=/; samesite=strict;';
        window.location.href = '/login';
    }

    return (
        
        <div id="tabla">
          <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-warning" href="/">BOCA Shop</a>
            <div className="navbar-nav">
              <div className="nav-item text-nowrap bg-danger ">
                <button className="btn btn-danger" onClick={logout}>Logout</button>
              </div>
            </div>
          </header>

          <div className="container-fluid">
            <div className="row">
              <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                <div className="position-sticky pt-3 sidebar-sticky">
                  <ul className="nav flex-column">
                    <li className="nav-item">
                      <a className="nav-link active text-warning" aria-current="page" href="/">
                      <span data-feather="home" className="align-text-bottom"></span>
                        Dashboard
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link text-warning" href="/">
                        <span data-feather="file" className="align-text-bottom"></span>
                        Orders
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link text-warning" href="/">
                        <span data-feather="shopping-cart" className="align-text-bottom"></span>
                        Products
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link text-warning" href="/">
                        <span data-feather="users" className="align-text-bottom"></span>
                        Customers
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link text-warning" href="/">
                        <span data-feather="bar-chart-2" className="align-text-bottom"></span>
                        Reports
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link text-warning" href="/">
                        <span data-feather="layers" className="align-text-bottom"></span>
                        Integrations
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
    )
}

