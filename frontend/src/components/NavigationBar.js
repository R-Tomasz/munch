import React from "react";
import {Container, Nav, Navbar} from 'react-bootstrap';
import {Link} from "react-router-dom";
import {logoutUser} from "../services/auth/AuthAction";
import {useDispatch, useSelector} from "react-redux";

const NavigationBar = () => {
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(logoutUser());
    };

    const userState = useSelector(state => state.auth);

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Nav className="me-auto">
                        <Link to="" className={"nav-link"}>Home {userState.username}</Link>
                        {userState.isLoggedIn !== true ? (
                            <>
                                <Link to="login" className={"nav-link"}>Login</Link>
                            </>
                        ) : (
                            <>
                                <Link to="new-game" className={"nav-link"}>Nowa gra</Link>
                                <Link to="" onClick={logout} className={"nav-link"}>Logout</Link>
                            </>
                        )}
                    </Nav>
                </Container>
            </Navbar>
        </div>

    );
}

export default NavigationBar;