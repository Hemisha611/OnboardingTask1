import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';


export class Navigation extends Component{
    render(){
        return(
            <Navbar bg="dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                
                <Nav>
                    
                    <NavLink className="d-inline p-2 text-light"
                    to="/">React</NavLink>

                    <NavLink className="d-inline p-2 text-light"
                    to="/Customer">Customer</NavLink>

                    <NavLink className="d-inline p-2 text-white"
                    to="/Product">Product</NavLink>
                    
                    <NavLink className="d-inline p-2 text-white"
                    to="/Store">Store</NavLink>

                    <NavLink className="d-inline p-2 text-white"
                    to="/Sales">Sales</NavLink>
                    

                </Nav>
            
            </Navbar.Collapse>
            </Navbar>
        )
    }
}