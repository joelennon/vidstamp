import React, { Component } from 'react';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

class NavBar extends Component {
    state = {
        isOpen: false,
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    logout = () => {

    }

    render() {
        const { isOpen } = this.state;
        const { appName, user } = window.appData;
        const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

        return (
            <Navbar color="light" light expand="md">
                <div className="container">
                    <Link to="/" className="navbar-brand mr-4">{appName}</Link>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <RouterNavLink className="nav-link" to="/jobs">Jobs</RouterNavLink>
                            </NavItem>
                        </Nav>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="https://github.com/joelennon/vidstamp" target="_blank">GitHub</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    {user.name}
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <form method="post" action="/logout">
                                        <input type="hidden" name="_token" value={csrfToken} />
                                        <DropdownItem tag="button" type="submit">
                                            Logout
                                        </DropdownItem>
                                    </form>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
        );
    }
}

export default NavBar;