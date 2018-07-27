import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../assets/navbar.css';

class Navbar extends Component{
    render(){
        return(
            <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
                <div className="container">
                <Link className="navbar-brand" to="/">Daniel Catz</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                    <Link className="nav-link" to="/" >Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="https://www.linkedin.com/in/daniel-caterson-8243583a/">LinkedIn</a>
                   
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="https://github.com/DanielCatz">GitHub</a>
                    
                    </li>
                </ul>
                </div>
                </div>
          </nav>          
       
       
       
    
    
    );
    }

}

export default Navbar;