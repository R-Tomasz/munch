import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";
import {authenticateUser} from "../services/auth/AuthAction";
import {useDispatch} from "react-redux";

const Login = () => {
    const dispatch = useDispatch();
    let initialState = {
        username: "",
        password: ""
    };
    const [userForm, setUserForm] = useState(initialState);

    const validateUser = () => {
        dispatch(authenticateUser(userForm.username, userForm.password))
            .then((response) => {
                setUserForm(initialState);
            })
            .catch((error) => {
                console.log('error , ', error.message);
            });
    };

    const credentialChange = e => {
        const {name, value} = e.target;
        setUserForm({...userForm, [name]: value});
    }
    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text"
                              name="username"
                              placeholder="Username"
                              value={userForm.username}
                              onChange={credentialChange}/>
            </Form.Group>
            <p>aaa </p>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Username</Form.Label>
                <Form.Control type="password"
                              name="password"
                              placeholder="Password"
                              value={userForm.password}
                              onChange={credentialChange}/>
            </Form.Group>
            <Button onClick={validateUser}>Zaloguj</Button>
        </Form>
    );
};

export default Login;