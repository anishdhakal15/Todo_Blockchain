import {useNavigate} from "react-router-dom";
import "./nav.css"

function Nav(){
  const navigate = useNavigate();
  const Home = (e) => {
    e.preventDefault();
    navigate('/')
  }
  
  const Todo = (e) => {
    e.preventDefault();
    navigate('/todo')
  }
    return(
        <>
        <header className="bd-header bg-dark py-3 d-flex align-items-stretch border-bottom border-dark">
          <div className="container-fluid d-flex align-items-center">
            <h1 className="d-flex align-items-center fs-4 text-white mb-0">
              Blockchain
            </h1>
            <a className="nav-item nav-link text-light" href="#!" onClick={Home}>Home</a>
              <a className="nav-item nav-link text-light" href="#!" onClick={Todo}>Todo.</a>
  </div>
            <a href="/docs/5.2/examples/cheatsheet-rtl/" className="ms-auto link-light" hrefLang="ar">Others</a>

        </header>
        </>
    )
}

export default Nav;